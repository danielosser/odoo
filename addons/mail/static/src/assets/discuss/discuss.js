/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            Discuss
        [Model/fields]
            activeId
            activeMobileNavbarTabId
            addingChannelValue
            categoryChannel
            categoryChat
            hasThreadView
            initActiveId
            isAddingChannel
            isAddingChat
            isOpen
            menuId
            replyingToMessage
            replyingToMessageComposerView
            sidebarQuickSearchValue
            startAMeetingButtonRef
            thread
            threadView
            threadViewer
        [Model/id]
            Discuss/messaging
        [Model/actions]
            Discuss/clearIsAddingItem
            Discuss/close
            Discuss/focus
            Discuss/handleAddChannelAutocompleteSelect
            Discuss/handleAddChannelAutocompleteSource
            Discuss/handleAddChatAutocompleteSelect
            Discuss/handleAddChatAutocompleteSource
            Discuss/onClickMobileNewChatButton
            Discuss/onClickMobileNewChannelButton
            Discuss/onClickStartAMeetingButton
            Discuss/onInputQuickSearch
            Discuss/openInitThread
            Discuss/openThread
            Discuss/threadToActiveId
`;
