/** @odoo-module **/

const { Component } = owl;
import { registerMessagingComponent } from '@mail/utils/messaging_component';

export class MessageReactionGroupForSummary extends Component {

    get messageReactionGroup() {
        return this.messaging.models['mail.message_reaction_group'].get(this.props.messageReactionGroupLocalId);
    }

}

Object.assign(MessageReactionGroupForSummary, {
    props: {
        messageReactionGroupLocalId: String,
    },
    template: 'mail.MessageReactionGroupForSummary',
});

registerMessagingComponent(MessageReactionGroupForSummary);
