/** @odoo-module **/

import { registerNewModel } from '@mail/model/model_core';
import { attr, many2one, one2many, one2one } from '@mail/model/model_field';
import { insertAndReplace } from '@mail/model/model_field_command';

export const address = {
    modelName: 'test.address',
    identifyingFields: ['id'],
    fields: {
        id: attr({
            readonly: true,
            required: true,
        }),
        addressInfo: attr(),
        contact: one2one('test.contact', {
            inverse: 'address',
        }),
    },
};

export const contact = {
    modelName: 'test.contact',
    identifyingFields: ['id'],
    fields: {
        id: attr({
            readonly: true,
            required: true,
        }),
        address: one2one('test.address', {
            inverse: 'contact',
        }),
        favorite: one2one('test.hobby', {
            default: insertAndReplace({ description: 'football' }),
        }),
        hobbies: one2many('test.hobby', {
            default: insertAndReplace([
                { description: 'hiking' },
                { description: 'fishing' },
            ]),
        }),
        tasks: one2many('test.task', {
            inverse: 'responsible'
        }),
    },
};

export const hobby = {
    modelName: 'test.hobby',
    identifyingFields: ['description'],
    fields: {
        description: attr({
            readonly: true,
            required: true,
        }),
    },
};

export const task = {
    modelName: 'test.task',
    identifyingFields: ['id'],
    fields: {
        id: attr({
            readonly: true,
            required: true,
        }),
        title: attr(),
        difficulty: attr({
            default: 1,
        }),
        responsible: many2one('test.contact', {
            inverse: 'tasks'
        }),
    },
};

registerNewModel(address);
registerNewModel(contact);
registerNewModel(hobby);
registerNewModel(task);
