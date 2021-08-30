/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            replyingToMessageComposerNonMobile
        [Element/model]
            DiscussComponent
        [Field/target]
            ComposerViewComponent
        [Model/traits]
            DiscussComponent/replyingToMessageComposer
        [Element/isPresent]
            @record
            .{DiscussComponent/discuss}
            .{Discuss/isReplyingToMessage}
        [Element/props]
            [ComposerViewComponent/composer]
                @record
                .{DiscussComponent/discuss}
                .{Discuss/replyingToMessage}
                .{Message/originThread}
                .{Thread/composer}
            [ComposerViewComponent/hasCurrentPartnerAvatar]
                false
            [ComposerViewComponent/hasDiscardButton]
                true
            [ComposerViewComponent/hasThreadName]
                true
            [ComposerViewComponent/isDoFocus]
                @record
                .{DiscussComponent/discuss}
                .{Discuss/isDoFocus}
            [ComposerViewComponent/textInputSendShortcuts]
                'ctrl-enter'
                'meta-enter'
`;
