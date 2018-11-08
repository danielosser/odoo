odoo.define('web.SortedRegistry', function (require) {
"use strict";

var Registry = require('web.Registry');

/**
 * A sorted registry is a registry in whick items are sorted.
 */
var SortedRegistry = Registry.extend({
    /**
     * @constructor
     * @param {Object} [mapping] the initial data in the registry
     */
    init: function (mapping, sortFunction) {
        var self = this;
        this._super.apply(this, arguments);
        this._scores = {};
        this.sortedKeys = _.sortBy(Object.keys(this.map), sortFunction);
        this.listeners.push(function () {
            self.sortedKeys = _.sortBy(Object.keys(self.map), sortFunction);
        });
    },

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * overide
     *
     *  Allows to attribute a score to the added key. This can be used to sort keys
     *  using the scores.
     *
     * @param {string} key
     * @param {any} value
     * @param {number} score
     * @returns {Registry} can be used to chain add calls.
     */
    add: function (key, value, score) {
        this._super.apply(this, arguments);
        this._scores[key] = score;
    },
    /**
     * @overide
     * returns the object map keys sorted according to this.sortFunction
     * returns {string[]}
     */
    keys: function () {
        return this.sortedKeys;
    },
});

return SortedRegistry;

});