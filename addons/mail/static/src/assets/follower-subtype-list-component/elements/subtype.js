/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            subtype
        [Element/model]
            FollowerSubtypeListComponent
        [Field/target]
            FollowerSubtypeComponent
        [Element/props]
            [FollowerSubtypeComponent/follower]
                @record
                .{FollowerSubtypeListComponent/record}
                .{FollowerSubtypeList/follower}
            [FollowerSubtypeComponent/followerSubtype]
                @template
                .{Template/subtype}
        [Element/t-foreach]
            @record
            .{FollowerSubtypeListComponent/record}
            .{FollowerSubtypeList/follower}
            .{Follower/subtypes}
        [Element/t-as]
            subtype
        [Element/t-key]
            @template
            .{Template/subtype}
            .{FollowerSubtype/id}
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex-flow]
                column
`;
