/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            checkboxInput
        [Element/model]
            ComposerSuggestedRecipientComponent
        [web.Element/tag]
            input
        [web.Element/class]
            custom-control-input
        [web.Element/id]
            @record
            .{ComposerSuggestedRecipientComponent/id}
            .{+}
                -checkbox
        [web.Element/type]
            checkbox
        [web.Element/isChecked]
            @record
            .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
            .{SuggestedRecipientInfo/isSelected}
        [Element/onChange]
            {Record/update}
                [0]
                    @record
                    .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                [1]
                    [SuggestedRecipientInfo/isSelected]
                        @record
                        .{ComposerSuggestedRecipientComponent/checkboxInput}
                        .{web.Element/isChecked}
            {if}
                @record
                .{ComposerSuggestedRecipientComponent/suggestedRecipientInfo}
                .{SuggestedRecipientInfo/partner}
            .{then}
                {break}
            {Dev/comment}
                Recipients must always be partners. On selecting a suggested
                recipient that does not have a partner, the partner creation form
                should be opened.
            {if}
                @record
                .{ComposerSuggestedRecipientComponent/checkboxInput}
                .{web.Element/isChecked}
                .{&}
                    @record
                    .{ComposerSuggestedRecipientComponent/dialog}
                .{&}
                    record
                    .{ComposerSuggestedRecipientComponent/_isDialogOpen}
                    .{isFalsy}
            .{then}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [ComposerSuggestedRecipientComponent/_isDialogOpen]
                            true
                @record
                .{ComposerSuggestedRecipientComponent/dialog}
                .{Dict/get}
                    comp
                .{Dict/get}
                    widget
                .{Dict/get}
                    on
                .{Function/call}
                    [0]
                        closed
                    [1]
                        @record
                    [2]
                        {func}
                            {Record/update}
                                [0]
                                    @record
                                [1]
                                    [ComposerSuggestedRecipientComponent/_isDialogOpen]
                                        false
                {DialogComponent/open}
                    @record
                    .{ComposerSuggestedRecipientComponent/dialog}
`;
