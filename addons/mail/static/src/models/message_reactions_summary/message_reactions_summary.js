/** @odoo-module **/

import { registerNewModel } from '@mail/model/model_core';
import { attr, one2one } from '@mail/model/model_field';
import { clear, create, insertAndReplace, unlink } from '@mail/model/model_field_command';

function factory(dependencies) {

    class MessageReactionsSummary extends dependencies['mail.model'] {

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------


        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        /**
         * @override
         */
        static _createRecordLocalId(data) {
            return `${this.modelName}_${data.messageId}`;
        }

        _computeMessage() {
            if (this.messageId) {
                return insertAndReplace({
                    id: this.messageId,
                });
            }
            else {
                return clear();
            }
        }

        _computePartnersWhoReacted() {
            let partners = [];
            const message = this.messaging && this.messaging.models['mail.message'].get(this.messageId);
            for (const partner of this.highlightedReaction.partners) {
                partner.avatar = `/mail/channel/${message.originThread.id}/partner/${partner.id}/avatar_128`;
                partners.push(partner);
            }
            for (const guest of this.highlightedReaction.guests) {
                guest.avatar = `/mail/channel/${message.originThread.id}/partner/${guest.id}/avatar_128`;
                partners.push(guest);
            }
            return partners;
        }
    }

    MessageReactionsSummary.fields = {
        message: one2one('mail.message', {
            inverse: 'messageReactionsSummary',
        }),
        messageId: attr({
            required: true,
        }),
        partnersWhoReacted: attr({
            compute: '_computePartnersWhoReacted',
        }),
        highlightedReaction: attr(),
    };

    MessageReactionsSummary.modelName = 'mail.message_reactions_summary';

    return MessageReactionsSummary;
}

registerNewModel('mail.message_reactions_summary', factory);
