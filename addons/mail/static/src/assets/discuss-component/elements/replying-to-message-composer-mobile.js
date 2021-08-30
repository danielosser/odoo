/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            replyingToMessageComposerMobile
        [Element/model]
            DiscussComponent
        [Field/target]
            ComposerViewComponent
        [Model/traits]
            DiscussComponent/replyingToMessageComposer
        [Element/isPresent]
            {Messaging/isInitialized}
            .{&}
                {Device/isMobile}
            .{&}
                {Discuss/replyingToMessageComposerView}
        [web.Element/class]
            w-100
        [Element/props]
            [ComposerViewComponent/composerView]
                {Discuss/composerView}
            [ComposerViewComponent/hasCurrentPartnerAvatar]
                {Device/isMobile}
                .{isFalsy}
            [ComposerViewComponent/hasDiscardButton]
                true
            [ComposerViewComponent/hasThreadName]
                true
            [ComposerViewComponent/textInputSendShortcuts]
                'ctrl-enter'
                'meta-enter'
`;
