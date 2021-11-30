/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            followingIcon
        [Element/model]
            FollowButtonComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-check
        [Element/isPresent]
            @record
            .{FollowButtonComponent/isUnfollowButtonHighlighted}
`;
