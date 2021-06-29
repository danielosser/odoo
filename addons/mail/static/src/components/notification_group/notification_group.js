/** @odoo-module **/

import { useModels } from '@mail/component_hooks/use_models/use_models';
import { useShouldUpdateBasedOnProps } from '@mail/component_hooks/use_should_update_based_on_props/use_should_update_based_on_props';

const { Component } = owl;
const { useRef } = owl.hooks;

export class NotificationGroup extends Component {

    /**
     * @override
     */
    constructor(...args) {
        super(...args);
        useShouldUpdateBasedOnProps();
        useModels();
        /**
         * Reference of the "mark as read" button. Useful to disable the
         * top-level click handler when clicking on this specific button.
         */
        this._markAsReadRef = useRef('markAsRead');
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @returns {mail.notification_group}
     */
    get group() {
        return this.env.models['mail.notification_group'].get(this.props.notificationGroupLocalId);
    }

    /**
     * @returns {string|undefined}
     */
    image() {
        if (this.group.notification_type === 'email') {
            return '/mail/static/src/img/smiley/mailfailure.jpg';
        }
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClick(ev) {
        this.group.onClickGroup(ev);
    }

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClickMarkAsRead(ev) {
        this.group.onClickMarkAsRead(ev);
    }

}

Object.assign(NotificationGroup, {
    props: {
        notificationGroupLocalId: String,
    },
    template: 'mail.NotificationGroup',
});
