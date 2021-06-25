/** @odoo-module **/

import { useShouldUpdateBasedOnProps } from '@mail/component_hooks/use_should_update_based_on_props/use_should_update_based_on_props';
import { useStore } from '@mail/component_hooks/use_store/use_store';

const { Component } = owl;

export class MailTemplate extends Component {

    /**
     * @override
     */
    constructor(...args) {
        super(...args);
        useShouldUpdateBasedOnProps();
        useStore(props => {
            const activity = this.env.services.messaging.models['mail.activity'].get(props.activityLocalId);
            const mailTemplate = this.env.services.messaging.models['mail.mail_template'].get(props.mailTemplateLocalId);
            return {
                activity: activity ? activity.__state : undefined,
                mailTemplate: mailTemplate ? mailTemplate.__state : undefined,
            };
        });
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @returns {mail.activity}
     */
    get activity() {
        return this.env.services.messaging.models['mail.activity'].get(this.props.activityLocalId);
    }

    /**
     * @returns {mail.mail_template}
     */
    get mailTemplate() {
        return this.env.services.messaging.models['mail.mail_template'].get(this.props.mailTemplateLocalId);
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClickPreview(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.mailTemplate.preview(this.activity);
    }

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClickSend(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.mailTemplate.send(this.activity);
    }

}

Object.assign(MailTemplate, {
    props: {
        activityLocalId: String,
        mailTemplateLocalId: String,
    },
    template: 'mail.MailTemplate',
});
