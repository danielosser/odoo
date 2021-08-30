/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ThreadView
        [Model/fields]
            _loaderTimeout
            channelInvitationForm
            compact
            componentHintList
            composerView
            extraClass
            hasAutoScrollOnMessageReceived
            hasComposerFocus
            hasMemberList
            hasSquashCloseMessages
            hasTopbar
            isLoading
            isMemberListOpened
            isPreparingLoading
            lastMessage
            lastNonTransientMessage
            lastVisibleMessage
            messageViews
            messages
            order
            replyingToMessageView
            rtcCallViewer
            textInputSendShortcuts
            thread
            threadCache
            threadCacheInitialScrollHeight
            threadCacheInitialScrollPosition
            threadCacheInitialScrollPositions
            threadViewer
            topbar
        [Model/id]
            ThreadView/threadViewer
        [Model/actions]
            ThreadView/_shouldMessageBeSquashed
            ThreadView/addComponentHint
            ThreadView/handleVisibleMessage
            ThreadView/markComponentHintProcessed
            ThreadView/startEditingLastMessageFromCurrentUser
        [Model/onChanges]
            onThreadCacheChanged
            onThreadCacheIsLoadingChanged
            onThreadShouldBeSetAsSeen
`;
