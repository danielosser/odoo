/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            enableMicrophoneButton
        [Element/model]
            MediaPreviewComponent
        [Model/traits]
            MediaPreviewComponent/button
        [web.Element/class]
            btn-danger
            fa-microphone-slash
        [Element/isPresent]
            @record
            .{MediaPreviewComponent/mediaPreview}
            .{MediaPreview/isMicrophoneEnabled}
            .{isFalsy}
        [Element/onClick]
            {MediaPreview/onClickEnableMicrophoneButton}
                [0]
                    @record
                    .{MediaPreviewComponent/mediaPreview}
                [1]
                    @ev
`;
