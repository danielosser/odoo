/** @odoo-module **/

import { registerNewModel } from '@mail/model/model_core';
import { attr, many2many, many2one, one2one } from '@mail/model/model_field';
import { clear, insertAndReplace, link, replace, unlink } from '@mail/model/model_field_command';

function factory(dependencies) {

    class MessageReactionsSummaryView extends dependencies['mail.model'] {

        /**
         * @override
         */
        _created() {
            super._created();
            this.onClickReaction = this.onClickReaction.bind(this);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        /**
         * @param {Object} messageReactionGroup
         */
        onClickReaction(messageReactionGroup) {
            this.update({
                highlightedReaction: replace(messageReactionGroup)
            });
        }

        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        _computeHighlightedReaction() {
            if (!this.highlightedReaction) {
                if(this.messageReactionsSummary.message.messageReactionGroups.length > 0) {
                    return link(this.messageReactionsSummary.message.messageReactionGroups[0]);
                } else {
                    return clear();
                }
            }
        }

        //----------------------------------------------------------------------
        // Handlers
        //----------------------------------------------------------------------

    }

    MessageReactionsSummaryView.fields = {
        highlightedReaction: many2one('mail.message_reaction_group', {
            compute: '_computeHighlightedReaction'
        }),
        messageReactionsSummary: one2one('mail.message_reactions_summary',{
            isCausal: true,
            inverse: 'messageReactionsSummaryView',
        }),
        threadView: one2one('mail.thread_view', {
            inverse: 'messageReactionsSummaryView',
            readonly: true,
        }),
    };

    MessageReactionsSummaryView.identifyingFields = ['threadView'];
    MessageReactionsSummaryView.modelName = 'mail.message_reactions_summary_view';

    return MessageReactionsSummaryView;
}

registerNewModel('mail.message_reactions_summary_view', factory);
