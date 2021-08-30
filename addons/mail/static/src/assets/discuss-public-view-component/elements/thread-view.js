/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            threadView
        [Element/model]
            DiscussPublicViewComponent
        [Element/isPresent]
            @record
            .{DiscussPublicViewComponent/discussPublicView}
            .{DiscussPublicView/threadView}
        [Field/target]
            ThreadViewComponent
        [Element/props]
            [ThreadViewComponent/hasComposerThreadTyping]
                true
            [ThreadViewComponent/threadView]
                @record
                .{DiscussPublicViewComponent/discussPublicView}
                .{DiscussPublicView/threadView}
`;
