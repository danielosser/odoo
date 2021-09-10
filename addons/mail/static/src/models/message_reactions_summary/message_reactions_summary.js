/** @odoo-module **/

import { registerNewModel } from '@mail/model/model_core';
import { attr, many2many, many2one, one2one } from '@mail/model/model_field';
import { clear, insertAndReplace, link, replace, unlink } from '@mail/model/model_field_command';

function factory(dependencies) {

    class MessageReactionsSummary extends dependencies['mail.model'] {

        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        _computeGuestsWhoReacted() {
            if (this.messageReactionsSummaryView.highlightedReaction) {
                return replace(this.messageReactionsSummaryView.highlightedReaction.guests);
            }
            else {
                return clear();
            }
        }

        _computePartnersWhoReacted() {
            if (this.messageReactionsSummaryView.highlightedReaction) {
                return replace(this.messageReactionsSummaryView.highlightedReaction.partners);
            }
            else {
                return clear();
            }
        }

    }

    MessageReactionsSummary.fields = {
        /**
         * States the OWL component of this message reactions summary.
         */
        component: attr(),
        message: one2one('mail.message', {
            inverse: 'messageReactionsSummary',
            readonly: true,
        }),
        messageReactionsSummaryView: one2one('mail.message_reactions_summary_view', {
            inverse: 'messageReactionsSummary',
            readonly: true,
        }),
        partners: many2many('mail.partner', {
            compute: '_computePartnersWhoReacted',
        }),
        guests: many2many('mail.guest', {
            compute: '_computeGuestsWhoReacted',
        }),
    };

    MessageReactionsSummary.identifyingFields = ['messageReactionsSummaryView'];
    MessageReactionsSummary.modelName = 'mail.message_reactions_summary';

    return MessageReactionsSummary;
}

registerNewModel('mail.message_reactions_summary', factory);
