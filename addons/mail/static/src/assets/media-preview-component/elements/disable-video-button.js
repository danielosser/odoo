/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            disableVideoButton
        [Element/model]
            MediaPreviewComponent
        [Model/traits]
            MediaPreviewComponent/button
        [web.Element/class]
            btn-dark
            border-light
            fa-video-camera
        [Element/isPresent]
            @record
            .{MediaPreviewComponent/mediaPreview}
            .{MediaPreview/isVideoEnabled}
        [Element/onClick]
            {MediaPreview/onClickDisableVideoButton}
                [0]
                    @record
                    .{MediaPreviewComponent/mediaPreview}
                [1]
                    @ev
`;
