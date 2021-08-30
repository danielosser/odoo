/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            follower
        [Element/model]
            FollowerListMenuComponent
        [Field/target]
            FollowerComponent
        [web.Element/class]
            dropdown-item
        [Element/isPresent]
            @record
            .{FollowerListMenuComponent/thread}
            .{Thread/followers}
            .{Collection/length}
            .{>}
                0
        [Element/props]
            [FollowerComponent/follower]
                @template
                .{Template/follower}
        [Element/t-foreach]
            @record
            .{FollowerListMenuComponent/thread}
            .{Thread/followers}
        [Element/t-as]
            follower
        [Element/t-key]
            @template
            .{Template/follower}
            .{Record/id}
        [Element/onClick]
            {FollowerListMenuComponent/_hide}
                @record
`;
