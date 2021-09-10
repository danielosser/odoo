/** @odoo-module **/

import { registerMessagingComponent } from '@mail/utils/messaging_component';
import { replace } from '@mail/model/model_field_command';
import { useComponentToModel } from '@mail/component_hooks/use_component_to_model/use_component_to_model';

const { Component } = owl;

export class MessageReactionsSummary extends Component {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    setup() {
        super.setup();
        useComponentToModel({ fieldName: 'component', modelName: 'mail.message_reactions_summary', propNameAsRecordLocalId: 'localId' });
    }

    get messageReactionsSummary() {
        return this.messaging && this.messaging.models['mail.message_reactions_summary'].get(this.props.localId);
    }

}

Object.assign(MessageReactionsSummary, {
    props: {
        localId: String,
    },
    template: 'mail.MessageReactionsSummary',
});

registerMessagingComponent(MessageReactionsSummary);
