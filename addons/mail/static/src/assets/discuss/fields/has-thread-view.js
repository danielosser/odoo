/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether 'this.thread' should be displayed.
    {Field}
        [Field/name]
            hasThreadView
        [Field/model]
            Discuss
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            {if}
                @record
                .{Discuss/thread}
                .{isFalsy}
                .{|}
                    @record
                    .{Discuss/isOpen}
                    .{isFalsy}
            .{then}
                false
            .{elif}
                {Device/isMobile}
                .{&}
                    @record
                    .{Discuss/activeMobileNavbarTabId}
                    .{!=}
                        mailbox
                    .{|}
                        @record
                        .{Discuss/thread}
                        .{Thread/model}
                        .{!=}
                            mail.box
            .{then}
                false
            .{else}
                true
`;
