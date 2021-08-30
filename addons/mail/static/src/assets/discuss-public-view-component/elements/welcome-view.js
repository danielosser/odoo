/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            welcomeView
        [Element/model]
            DiscussPublicViewComponent
        [Element/isPresent]
            @record
            .{DiscussPublicViewComponent/discussPublicView}
            .{DiscussPublicView/welcomeView}
        [Field/target]
            WelcomeViewComponent
        [Element/props]
            [WelcomeViewComponent/welcomeView]
                @record
                .{DiscussPublicViewComponent/discussPublicView}
                .{DiscussPublicView/welcomeView}
`;
