/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussComponent
        [Model/fields]
            _lastThreadCache
            _lastThreadCounter
            discuss
        [Model/template]
            root
                messagingNotInitialized
                    messagingNotInitializedIcon
                    messagingNotInitializedLabel
                sidebar
                mobileMailboxSelection
                mobileAddItemHeader
                    mobileAddItemHeaderInput
                threadMobile
                noThreadMobile
                mobileNewChatButton
                mobileNewChannelButton
                notificationList
                mobileNavbar
                replyingToMessageComposerMobile
                content
                    threadNonMobile
                    noThreadNonMobile
        [Model/actions]
            DiscussComponent/_updateLocalStoreProps
            DiscussComponent/getMobileNavbarTabs
            DiscussComponent/_onMobileAddItemHeaderInputSelect
            DiscussComponent/_onMobileAddItemHeaderInputSource
        [Model/lifecycles]
            onPatched
            onUpdate
            onWillUnmount
`;
