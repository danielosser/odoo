/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Type of the related channel thread.
    {Field}
        [Field/name]
            channelType
        [Field/model]
            DiscussSidebarCategoryItem
        [Field/type]
            attr
        [Field/related]
            DiscussSidebarCategoryItem/channel
            Thread/channelType
`;
