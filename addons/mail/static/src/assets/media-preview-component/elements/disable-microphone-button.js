/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            disableMicrophoneButton
        [Element/model]
            MediaPreviewComponent
        [Model/traits]
            MediaPreviewComponent/button
        [web.Element/class]
            btn-dark
            border-light
            fa-microphone
        [Element/isPresent]
            @record
            .{MediaPreviewComponent/mediaPreview}
            .{MediaPreview/isMicrophoneEnabled}
        [Element/onClick]
            {MediaPreview/onClickDisableMicrophoneButton}
                [0]
                    @record
                    .{MediaPreviewComponent/mediaPreview}
                [1]
                    @ev
`;
