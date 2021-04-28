/** @odoo-module **/

import { evaluate, formatAST, parseExpr } from "../py_js/py";
import { toPyValue } from "../py_js/py_utils";

/**
 * @typedef {import("../py_js/py_parser").AST} AST
 * @typedef {[string, string, any]} Condition
 * @typedef {("&" | "|" | "!" | Condition)[]} DomainListRepr
 * @typedef {DomainListRepr | string | Domain} DomainRepr
 */

/**
 * Javascript representation of an Odoo domain
 */
export class Domain {
  /**
   * Combine various domains together with a given operator
   * @param {DomainRepr[]} domains
   * @param {"AND" | "OR"} operator
   * @returns {Domain}
   */
  static combine(domains, operator) {
    if (domains.length === 0) {
      return new Domain([]);
    }
    const domain1 = domains[0] instanceof Domain ? domains[0] : new Domain(domains[0]);
    if (domains.length === 1) {
      return domain1;
    }
    const domain2 = Domain.combine(domains.slice(1), operator);
    const result = new Domain([]);
    const astValues1 = domain1.ast.value;
    const astValues2 = domain2.ast.value;
    const op = operator === "AND" ? "&" : "|";
    const combinedAST = { type: 4 /* List */, value: astValues1.concat(astValues2) };
    result.ast = normalizeDomainAST(combinedAST, op);
    return result;
  }

  /**
   * Combine various domains together with `AND` operator
   * @param {DomainRepr} domains
   * @returns {Domain}
   */
  static and(domains) {
    return Domain.combine(domains, "AND");
  }

  /**
   * Combine various domains together with `OR` operator
   * @param {DomainRepr} domains
   * @returns {Domain}
   */
  static or(domains) {
    return Domain.combine(domains, "OR");
  }

  /**
   * Return the negation of the domain
   * @returns {Domain}
   */
  static not(domain) {
    const result = new Domain(domain);
    result.ast.value.unshift({ type: 1, value: "!" });
    return result;
  }

  /**
   * @param {DomainRepr} [descr]
   */
  constructor(descr = []) {
    if (descr instanceof Domain) {
      /** @type {AST} */
      return new Domain(descr.toString());
    } else {
      const rawAST = typeof descr === "string" ? parseExpr(descr) : toAST(descr);
      this.ast = normalizeDomainAST(rawAST);
    }
  }

  /**
   * Check if the set of records represented by a domain contains a record
   *
   * @param {Object} record
   * @returns {boolean}
   */
  contains(record) {
    const expr = evaluate(this.ast, record);
    return matchDomain(record, expr);
  }

  /**
   * @returns {string}
   */
  toString() {
    return formatAST(this.ast);
  }

  /**
   * @param {Object} context
   * @returns {DomainListRepr}
   */
  toList(context) {
    return evaluate(this.ast, context);
  }
}

const TRUE_LEAF = [1, '=', 1];
const FALSE_LEAF = [0, '=', 1];
const TRUE_DOMAIN = new Domain([TRUE_LEAF]);
const FALSE_DOMAIN = new Domain([FALSE_LEAF]);

Domain.TRUE = TRUE_DOMAIN;
Domain.FALSE = FALSE_DOMAIN;

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * @param {DomainListRepr} domain
 * @returns {AST}
 */
function toAST(domain) {
  const elems = domain.map((elem) => {
    switch (elem) {
      case "!":
      case "&":
      case "|":
        return { type: 1 /* String */, value: elem };
      default:
        return {
          type: 10 /* Tuple */,
          value: elem.map(toPyValue),
        };
    }
  });
  return { type: 4 /* List */, value: elems };
}

/**
 * Normalizes a domain
 *
 * @param {AST} domain
 * @param {'&' | '|'} [op]
 * @returns {AST}
 */

function normalizeDomainAST(domain, op = "&") {
  if (domain.type !== 4 /* List */) {
    throw new Error("Invalid domain AST");
  }
  let expected = -1;
  for (let child of domain.value) {
    if (child.type === 1 /* String */ && (child.value === "&" || child.value === "|")) {
      expected--;
    } else if (child.type !== 1 /* String */ || child.value !== "!") {
      expected++;
    }
  }
  let values = domain.value.slice();
  while (expected > 0) {
    expected--;
    values.unshift({ type: 1 /* String */, value: op });
  }
  return { type: 4 /* List */, value: values };
}

/**
 *
 * @param {*} record
 * @param {*} domain
 */
function matchDomain(record, domain) {
  if (domain.length === 0) {
    return true;
  }
  switch (domain[0]) {
    case "!":
      return !matchDomain(record, domain.slice(1));
    case "&":
      return matchDomain(record, domain.slice(1, 2)) && matchDomain(record, domain.slice(2));
    case "|":
      return matchDomain(record, domain.slice(1, 2)) || matchDomain(record, domain.slice(2));
    default:
      const condition = domain[0];
      const field = condition[0];
      const fieldValue = typeof field === "number" ? field : record[field];
      const value = condition[2];
      switch (condition[1]) {
        case "=":
        case "==":
          return fieldValue === value;
        case "!=":
        case "<>":
          return fieldValue !== value;
        case "<":
          return fieldValue < value;
        case "<=":
          return fieldValue <= value;
        case ">":
          return fieldValue > value;
        case ">=":
          return fieldValue >= value;
        case "in":
          return value.includes(fieldValue);
        case "not in":
          return !value.includes(fieldValue);
        case "like":
          return fieldValue.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        case "=like":
          const regExp = new RegExp(
            value
              .toLowerCase()
              .replace(/([.\[\]\{\}\+\*])/g, "\\$1")
              .replace(/%/g, ".*")
          );
          return regExp.test(fieldValue.toLowerCase());
        case "ilike":
          return fieldValue.indexOf(value) >= 0;
        case "=ilike":
          return new RegExp(value.replace(/%/g, ".*"), "i").test(fieldValue);
      }
  }
  throw new Error("could not match domain");
}
