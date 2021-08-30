/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Text that represents the status on this thread about typing members.
    {Field}
        [Field/name]
            typingStatusText
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            String
        [Field/compute]
            {if}
                @record
                .{Thread/orderedOtherTypingMembers}
                .{Collection/length}
                .{=}
                    0
            .{then}
                {Record/empty}
            {.elif}
                @record
                .{Thread/orderedOtherTypingMembers}
                .{Collection/length}
                .{=}
                    1
            .{then}
                {String/sprintf}
                    [0]
                        {Locale/text}
                            %s is typing...
                    [1]
                        @record
                        .{Thread/orderedOtherTypingMembers}
                        .{Collection/first}
                        .{Partner/nameOrDisplayName}
            .{elif}
                @record
                .{Thread/orderedOtherTypingMembers}
                .{Collection/length}
                .{=}
                    2
            .{then}
                {String/sprintf}
                    [0]
                        {Locale/text}
                            %s and %s are typing...
                    [1]
                        @record
                        .{Thread/orderedOtherTypingMembers}
                        .{Collection/first}
                        .{Partner/nameOrDisplayName}
                    [2]
                        @record
                        .{Thread/orderedOtherTypingMembers}
                        .{Collection/second}
                        .{Partner/nameOrDisplayName}
            .{else}
                {String/sprintf}
                    [0]
                        {Locale/text}
                            %s, %s and more are typing...
                    [1]
                        @record
                        .{Thread/orderedOtherTypingMembers}
                        .{Collection/first}
                        .{Partner/nameOrDisplayName}
                    [2]
                        @record
                        .{Thread/orderedOtherTypingMembers}
                        .{Collection/second}
                        .{Partner/nameOrDisplayName}
`;
