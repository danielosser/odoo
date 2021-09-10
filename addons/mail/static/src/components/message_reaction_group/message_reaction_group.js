/** @odoo-module **/

const { Component } = owl;
import { registerMessagingComponent } from '@mail/utils/messaging_component';

export class MessageReactionGroup extends Component {

    get messageReactionGroup() {
        return this.messaging.models['mail.message_reaction_group'].get(this.props.messageReactionGroupLocalId);
    }

    _onContextMenu() {
        const threadView = this.messaging && this.messaging.models['mail.thread_view'].get(this.props.threadViewLocalId);
        threadView.openReactionsSummary(this.messageReactionGroup);
    }
}

Object.assign(MessageReactionGroup, {
    props: {
        messageReactionGroupLocalId: String,
        threadViewLocalId: String,
    },
    template: 'mail.MessageReactionGroup',
});

registerMessagingComponent(MessageReactionGroup);
