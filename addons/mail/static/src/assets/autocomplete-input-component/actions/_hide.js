/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            AutocompleteInputComponent/_hide
        [Action/params]
            record
        [Action/behavior]
            {if}
                @record
                .{AutocompleteInputComponent/discussComponent}
            .{then}
                {Discuss/clearIsAddingItem}
                    @record
                    .{AutocompleteInputComponent/discussComponent}
                    .{DiscussComponent/discuss}
            {if}
                @record
                .{AutocompleteInputComponent/messagingMenuComponent}
            .{then}
                {MessagingMenu/toggleMobileNewMessage}
                    @record
                    .{AutocompleteInputComponent/messagingMenuComponent}
                    .{MessagingMenuComponent/messagingMenu}
`;
