/** @odoo-module **/

import { registerModel } from '@mail/model/model_core';
import { attr, one2many, one2one } from '@mail/model/model_field';
import { insertAndReplace, replace } from '@mail/model/model_field_command';

registerModel({
    name: 'mail.activity_box_view',
    identifyingFields: ['chatter'],
    lifecycleHooks: {
        _created() {
            // Bind necessary until OWL supports arrow function in handlers: https://github.com/odoo/owl/issues/876
            this.onClickActivityBoxTitle = this.onClickActivityBoxTitle.bind(this);
        },
    },
    recordMethods: {
        /**
         * Handles click on activity box title.
         */
        onClickActivityBoxTitle() {
            this.update({ isActivityListVisible: !this.isActivityListVisible });
        },

        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        /**
         * @private
         *
         * @returns FieldCommand
         */
        _computeActivityViews() {
            const activities = [];
            for (const activity of this.chatter.thread.activities) {
                activities.push({
                    activity: replace(activity),
                });
            }
            return insertAndReplace(activities);
        }

    },
    fields: {
        activityViews: one2many('mail.activity_view', {
            compute: '_computeActivityViews',
            inverse: 'activityBoxView',
            isCausal: true,
        }),
        chatter: one2one('mail.chatter', {
            inverse: 'activityBoxView',
            readonly: true,
            required: true,
        }),
        isActivityListVisible: attr({
            default: true,
        }),
    },

});
