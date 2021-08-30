/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            composer
        [Element/model]
            MessageViewComponent
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/composerViewInEditing}
        [web.Element/class]
            mb-1
        [Field/target]
            ComposerViewComponent
        [Element/props]
            [ComposerViewComponent/composerView]
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/composerViewInEditing}
            [ComposerViewComponent/hasCurrentPartnerAvatar]
                false
            [ComposerViewComponent/hasDiscardButton]
                false
            [ComposerViewComponent/hasMentionSuggestionsBelowPosition]
                false
            [ComposerViewComponent/hasSendButton]
                false
            [ComposerViewComponent/isCompact]
                true
            [ComposerViewComponent/textInputSendShortcuts]
                enter
`;
