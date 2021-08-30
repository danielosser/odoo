/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Called to refresh a registered other member partner that is typing
        something.
    {Action}
        [Action/name]
            Thread/refreshOtherMemberTypingMember
        [Action/params]
            thread
                [type]
                    Thread
            partner
                [type]
                    Partner
        [Action/behavior]
            {Timer/reset}
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
`;
