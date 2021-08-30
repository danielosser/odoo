/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            followButton
        [Element/model]
            ChatterTopbarComponent
        [Field/target]
            FollowButtonComponent
        [Model/traits]
            ChatterTopbarComponent/button
        [Element/isPresent]
            @record
            .{ChatterTopbarComponent/chatter}
            .{Chatter/hasFollowers}
            .{&}
                @record
                .{ChatterTopbarComponent/chatter}
                .{Chatter/thread}
            .{&}
                @record
                .{ChatterTopbarComponent/chatter}
                .{Chatter/thread}
                .{Thread/channelType}
                .{!=}
                    chat
        [Element/props]
            [FollowButtonComponent/isDisabled]
                @record
                .{ChatterTopbarComponent/chatter}
                .{Chatter/isDisabled}
            [FollowButtonComponent/thread]
                @record
                .{ChatterTopbarComponent/chatter}
                .{Chatter/thread}
`;
