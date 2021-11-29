/** @odoo-module **/
'use strict';

const { Component } = owl;

/**
 * Shallow compares `a` and `b`.
 *
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
function isEqual(a, b) {
    const keys = Object.keys(a);
    if (Object.keys(b).length !== keys.length) {
        return false;
    }
    for (const key of keys) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}

/**
 * This hook overrides the `shouldUpdate` method to ensure the component is only
 * updated if its props actually changed. This is especially useful to use on
 * components for which an extra render costs proportionally a lot more than
 * comparing props.
 *
 * @param {Object} [param0={}]
 */
export function useShouldUpdateBasedOnProps() {
    const component = Component.current;
    component.shouldUpdate = nextProps => {
        const allNewProps = Object.assign({}, nextProps);
        const defaultProps = component.constructor.defaultProps;
        for (const key in defaultProps) {
            if (allNewProps[key] === undefined) {
                allNewProps[key] = defaultProps[key];
            }
        }
        return !isEqual(component.props, allNewProps);
    };
}
