/** @odoo-module **/

import { registerMessagingComponent } from '@mail/utils/messaging_component';

const { Component } = owl;

export class MessageReactionsSummary extends Component {

    /**
     * @override
     */
    constructor(...args) {
        super(...args);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    get message() {
        return this.messageReactionGroup && this.messageReactionGroup.message;
    }

    get messageReactionGroup() {
        return this.messaging && this.messaging.models['mail.message_reaction_group'].get(this.props.messageReactionGroupLocalId);
    }

    get messageReactionsSummary() {
        return this.message && this.message.messageReactionsSummary;
    }

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onClickReaction(ev) {
        const reaction = ev.currentTarget.childNodes[0].innerText;
        const messageReactionGroup = this.message.messageReactionGroups.filter(messageReactionGroup =>
            messageReactionGroup.content === reaction)[0];
        this.messageReactionsSummary.update({
            highlightedReaction: messageReactionGroup,
        });
    }

}

Object.assign(MessageReactionsSummary, {
    props: {
        messageReactionGroupLocalId: String,
    },
    template: 'mail.MessageReactionsSummary',
});

registerMessagingComponent(MessageReactionsSummary);
