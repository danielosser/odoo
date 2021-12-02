/** @odoo-module */

/**
 * Defines a Set of which the elements are automatically sorted according to the
 * compare function returned by the given `getCompareFunction`.
 * Iterating the set is done according to this order.
 */
export class SelfOrderingSet {

    /**
     * @param {function} getCompareFunction function that returns the compare
     *  function to be used in Array.prototype.sort()
     */
    constructor(getCompareFunction) {
        this.set = new Set();
        this.array = new Array();
        this.getCompareFunction = getCompareFunction;
    }

    /**
     * @returns {integer}
     */
    get size() {
        return this.set.size;
    }

    /**
     * @param {*} value
     */
    add(value) {
        if (this.set.has(value)) {
            return;
        }
        this.set.add(value);
        this.array.push(value);
        // TODO SEB need to observe and re-sort when values for the "current" record changes
        this.array.sort(this.getCompareFunction());
    }

    /**
     * @param {*} value
     * @returns {boolean} whether the value was present
     */
    delete(value) {
        const wasPresent = this.set.delete(value);
        if (wasPresent) {
            const index = this.array.indexOf(value);
            this.array.splice(index, 1);
        }
        return wasPresent;
    }

    /**
     * @param {*} value
     * @returns {boolean} whether the value is present
     */
    has(value) {
        return this.set.has(value);
    }

    /**
     * @returns {iterator}
     */
    [Symbol.iterator]() {
        return this.array[Symbol.iterator]();
    }

}
