/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mediaPreview
        [Element/model]
            WelcomeViewComponent
        [web.Element/target]
            MediaPreviewComponent
        [Element/isPresent]
            @record
            .{WelcomeViewComponent/welcomeView}
            .{WelcomeView/mediaPreview}
        [Element/props]
            [MediaPreviewComponent/mediaPreview]
                @record
                .{WelcomeViewComponent/welcomeView}
                .{WelcomeView/mediaPreview}
        [web.Element/class]
            mr-5
`;
