/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ThreadViewComponent
        [Model/fields]
            getScrollableElement
            hasComposerCurrentPartnerAvatar
            hasComposerDiscardButton
            hasComposerSendButton
            hasComposerThreadName
            hasComposerThreadTyping
            hasScrollAdjust
            selectedMessage
            showComposerAttachmentsExtensions
            showComposerAttachmentsFilenames
            threadView
        [Model/template]
            root
                topbar
                bottomPart
                    core
                        rtcCallViewer
                        loading
                            loadingIcon
                            loadingText
                        messageList
                        loadingFailed
                            loadingFailedText
                            loadingFailedRetryButton
                        autogrowSeparator
                        composer
                    channelMemberList
        [Model/actions]
            ThreadViewComponent/getScrollHeight
            ThreadViewComponent/getScrollTop
            ThreadViewComponent/onScroll
`;
