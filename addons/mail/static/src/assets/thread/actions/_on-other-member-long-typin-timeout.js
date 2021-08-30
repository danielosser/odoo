/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Thread/_onOtherMemberLongTypingTimeout
        [Action/params]
            thread
                [type]
                    Thread
            partner
                [type]
                    Partner
        [Action/behavior]
            {if}
                @thread
                .{Thread/typingMembers}
                .{Collection/includes}
                    @partner
                .{isFalsy}
            .{then}
                {Dev/comment}
                    AKU TODO: timer should not be coupled with partner
                :partnerTimer
                    @thread
                    .{Thread/_otherMembersLongTypingTimers}
                    .{Collection/find}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Timer/partner}
                                .{=}
                                    @partner
                {Record/update}
                    [0]
                        @thread
                    [1]
                        [Thread/_otherMembersLongTypingTimers]
                            {Field/remove}
                                @partnerTimer
            .{then}
                {Thread/unregisterOtherMemberTypingMember}
                    [0]
                        @thread
                    [1]
                        @partner
`;
