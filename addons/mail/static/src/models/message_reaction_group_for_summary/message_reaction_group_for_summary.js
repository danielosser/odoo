/** @odoo-module **/

import { registerNewModel } from '@mail/model/model_core';
import { attr } from '@mail/model/model_field';

function factory(dependencies) {

    class MessageReactionGroupForSummary extends dependencies['mail.model'] {

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        //----------------------------------------------------------------------
        // Handlers
        //----------------------------------------------------------------------

    }

    MessageReactionGroupForSummary.fields = {
        id: attr({
            readonly: true,
            required: true,
        }),
    };

    MessageReactionGroupForSummary.identifyingFields = ['id'];
    MessageReactionGroupForSummary.modelName = 'mail.message_reaction_group_for_summary';

    return MessageReactionGroupForSummary;
}

registerNewModel('mail.message_reaction_group_for_summary', factory);
