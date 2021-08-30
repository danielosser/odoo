/** @odoo-module **/

import { Define } from '@mail/define';

import { FormViewDialog } from 'web.view_dialogs';

export default Define`
    {Element}
        [Element/name]
            formViewDialog
        [Element/model]
            ComposerSuggestedRecipientComponent
        [Field/target]
            FormViewDialogComponentAdapter
        [Element/isPresent]
            @record
            .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
            .{SuggestedRecipientInfo/partner}
            .{isFalsy}
        [Element/props]
            [FormViewDialogComponentAdapter/Component]
                ${FormViewDialog}
            [FormViewDialogComponentAdapter/params]
                [context]
                    [active_id]
                        @record
                        .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                        .{suggestedRecipientInfo/thread}
                        .{Thread/id}
                    [active_model]
                        mail.compose.message
                    [default_email]
                        @record
                        .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                        .{SuggestedRecipientInfo/email}
                    [default_name]
                        @record
                        .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                        .{SuggestedRecipientInfo/name}
                    [force_email]
                        true
                    [ref]
                        compound_context
                [disable_multiple_selection]
                    true
                [on_saved]
                    {func}
                        {if}
                            @record
                            .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                            .{isFalsy}
                            .{|}
                                @record
                                .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                                .{SuggestedRecipientInfo/thread}
                                .{isFalsy}
                        .{then}
                            {break}
                        {Thread/fetchAndUpdateSuggestedRecipients}
                            @record
                            .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                            .{SuggestedRecipientInfo/thread}
                [res_id]
                    false
                [res_model]
                    res.partner
                [title]
                    {Locale/text}
                        Please complete customer's information
`;
