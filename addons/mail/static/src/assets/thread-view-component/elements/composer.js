/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            composer
        [Element/model]
            ThreadViewComponent
        [Field/target]
            ComposerViewComponent
        [Element/isPresent]
            @record
            .{ThreadViewComponent/threadView}
            .{ThreadView/composerView}
        [Element/props]
            [ComposerViewComponent/composerView]
                @record
                .{ThreadViewComponent/threadView}
                .{ThreadView/composerView}
            [ComposerViewComponent/hasCurrentPartnerAvatar]
                @record
                .{ThreadViewComponent/hasComposerCurrentPartnerAvatar}
            [ComposerViewComponent/hasDiscardButton]
                @record
                .{ThreadViewComponent/hasComposerDiscardButton}
            [ComposerViewComponent/hasSendButton]
                @record
                .{ThreadViewComponent/hasComposerSendButton}
            [ComposerViewComponent/hasThreadName]
                @record
                .{ThreadViewComponent/hasComposerThreadName}
            [ComposerViewComponent/hasThreadTyping]
                @record
                .{ThreadViewComponent/hasComposerThreadTyping}
            [ComposerViewComponent/showAttachmentsExtensions]
                @record
                .{ThreadViewComponent/showComposerAttachmentsExtensions}
            [ComposerViewComponent/showAttachmentsFilenames]
                @record
                .{ThreadViewComponent/showComposerAttachmentsFilenames}
            [ComposerViewComponent/textInputSendShortcuts]
                @record
                .{ThreadViewComponent/threadView}
                .{ThreadView/textInputSendShortcuts}
        [web.Element/style]
            [web.scss/flex]
                0
                0
                auto
`;
