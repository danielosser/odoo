/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussSidebarCategoryItem
        [Model/fields]
            avatarUrl
            category
            channel
            channelType
            counter
            hasLeaveCommand
            hasSettingsCommand
            hasThreadIcon
            hasUnpinCommand
            isActive
            isUnread
        [Model/id]
            DiscussSidebarCategoryItem/category
            .{&}
                DiscussSidebarCategoryItem/channel
        [Model/actions]
            DiscussSidebarCategoryItem/_askAdminConfirmation
            DiscussSidebarCategoryItem/_askLeaveGroupConfirmation
            DiscussSidebarCategoryItem/onClick
            DiscussSidebarCategoryItem/onClickCommandLeave
            DiscussSidebarCategoryItem/onClickCommandSettings
            DiscussSidebarCategoryItem/onClickCommandUnpin
`;
