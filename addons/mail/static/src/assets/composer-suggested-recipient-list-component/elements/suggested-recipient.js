/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            suggestedRecipient
        [Element/model]
            ComposerSuggestedRecipientListComponent
        [Field/target]
            ComposerSuggestedRecipientComponent
        [Element/isPresent]
            @record
            .{ComposerSuggestedRecipientListComponent/thread}
        [Element/props]
            [ComposerSuggestedRecipientComponent/suggestedRecipientInfo]
                @template
                .{Template/recipientInfo}
        [Element/t-foreach]
            {if}
                @record
                .{ComposerSuggestedRecipientListComponent/hasShowMoreButton}
            .{then}
                @record
                .{ComposerSuggestedRecipientListComponent/thread}
                .{Thread/suggestedRecipientInfoList}
            .{else}
                @record
                .{ComposerSuggestedRecipientListComponent/thread}
                .{Thread/suggestedRecipientInfoList}
                .{Collection/slice}
                    0
                    3
        [Element/t-as]
            recipientInfo
        [Element/t-key]
            @template
            .{Template/recipientInfo}
            .{Record/id}
`;
