/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussSidebarCategory
        [Model/fields]
            activeItem
            autocompleteMethod
            categoryItems
            commandAddTitleText
            counter
            counterComputeMethod
            discussAsChannel
            discussAsChat
            hasAddCommand
            hasViewCommand
            isAddingItem
            isOpen
            isPendingOpen
            isServerOpen
            name
            newItemPlaceholderText
            selectedChannels
            selectedSortedChannels
            serverStateKey
            sortComputeMethod
            supportedChannelTypes
        [Model/id]
            DiscussSidebarCategory/discussAsChannel
            .{|}
                DiscussSidebarCategory/discussAsChat
        [Model/onChange]
            DiscussSidebarCategory/onIsServerOpenChanged
        [Model/actions]
            DiscussSidebarCategory/_sortByDisplayName
            DiscussSidebarCategory/_sortByLastInterestDateTime
            DiscussSidebarCategory/close
            DiscussSidebarCategory/onAddItemAutocompleteSelect
            DiscussSidebarCategory/onAddItemAutocompleteSource
            DiscussSidebarCategory/onClick
            DiscussSidebarCategory/onClickCommandAdd
            DiscussSidebarCategory/onClickCommandView
            DiscussSidebarCategory/onHideAddingItem
            DiscussSidebarCategory/open
            DiscussSidebarCategory/performRpcSetResUsersSettings
`;
