/* @odoo-module */
import { evaluateExpr } from "@web/core/py_js/py";

function isComponentNode(node) {
    return (
        node.tagName.charAt(0).toUpperCase() === node.tagName.charAt(0) ||
        (node.tagName === "t" && "t-component" in node.attributes)
    );
}

export function addLegacyNodeInfo(node, compiled) {
    const modifiers = getAllModifiers(node);
    if (modifiers) {
        const legacyNode = {
            attrs: { modifiers },
        };
        compiled.setAttribute("_legacyNode_", `"${encodeURI(JSON.stringify(legacyNode))}"`);
    }
}

export function decodeLegacyNodeInfo(info) {
    return JSON.parse(decodeURI(info));
}

/**
 * there is no particular expecation of what should be a boolean
 * according to a view's arch
 * Sometimes it is 0 or one, True or False ; true or false
 * @return {boolean}
 */
function evalIrUiViewModifier(expr) {
    if (!expr) {
        return false;
    }
    return evaluateExpr(expr, {
        true: true,
        false: false,
    });
}

function getAllModifiers(node) {
    const modifiers = node.getAttribute("modifiers");
    if (!modifiers) {
        return null;
    }
    const parsed = JSON.parse(modifiers);
    return parsed;
}

function getModifier(node, modifierName) {
    let mod = node.getAttribute(modifierName);
    if (mod === null) {
        const modifiers = getAllModifiers(node);
        mod = modifiers && modifierName in modifiers ? modifiers[modifierName] : null;
    }

    if (!Array.isArray(mod) && !(typeof mod === "boolean")) {
        mod = !!evalIrUiViewModifier(mod);
    }
    return mod;
}

function getInvisible(node) {
    const invisible = getModifier(node, "invisible");
    return invisible || false;
}

export function isAlwaysInvisible(node, params) {
    const invisibleModifer = getInvisible(node);
    return !params.enableInvisible && typeof invisibleModifer === "boolean" && invisibleModifer;
}

export function appendTo(parent, node) {
    if (!node) {
        return;
    }
    if (Array.isArray(node) && node.length) {
        parent.append(...node);
    } else {
        parent.append(node);
    }
}

function copyAttributes(node, compiled) {
    if (node.tagName === "button") {
        return;
    }
    const classes = node.getAttribute("class");
    if (classes) {
        compiled.classList.add(...classes.split(" "));
    }

    const isComponent = isComponentNode(compiled);

    for (const attName of ["style", "placeholder"]) {
        let att = node.getAttribute(attName);
        if (att) {
            if (isComponent && attName === "placeholder") {
                att = `"${att}"`;
            }
            compiled.setAttribute(attName, att);
        }
    }
}
