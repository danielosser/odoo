/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            threadMobile
        [Element/model]
            DiscussComponent
        [Field/target]
            ThreadViewComponent
        [Model/traits]
           DiscussComponent/thread
        [Element/isPresent]
            {Device/isMobile}
            .{&}
                {Discuss/threadView}
        [Element/props]
            [ThreadViewComponent/composerAttachmentsDetailsMode]
                card
            [ThreadViewComponent/hasComposer]
                {Discuss/thread}
                .{Thread/model}
                .{!=}
                    mail.box
            [ThreadViewComponent/hasComposerCurrentPartnerAvatar]
                false
            [ThreadViewComponent/hasComposerThreadTyping]
                true
            [ThreadViewComponent/hasSquashCloseMessages]
                {Discuss/thread}
                .{Thread/model}
                .{!=}
                    mail.box
            [ThreadViewComponent/haveMessagesMarkAsReadIcon]
                {Discuss/thread}
                .{=}
                    {Env/inbox}
            [ThreadViewComponent/haveMessagesReplyIcon]
                {Discuss/thread}
                .{=}
                    {Env/inbox}
            [ThreadViewComponent/isDoFocus]
                {Discuss/isDoFocus}
            [ThreadViewComponent/selectedMessage]
                {Discuss/replyingToMessage}
            [ThreadViewComponent/threadView]
                {Discuss/threadView}
        [web.Element/style]
            [web.scss/width]
                {scss/map-get}
                    {scss/$sizes}
                    100
`;
