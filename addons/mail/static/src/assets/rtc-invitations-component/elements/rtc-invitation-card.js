/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            rtcInvitationCard
        [Element/model]
            RtcInvitationsComponent
        [Element/t-foreach]
            {Env/ringingThreads}
        [Element/t-as]
            thread
        [Element/t-key]
            @template
            .{Template/thread}
            .{Record/id}
        [web.Element/target]
            RtcInvitationCardComponent
        [Element/props]
            [RtcInvitationCardComponent/thread]
                @template
                .{Template/thread}
`;
