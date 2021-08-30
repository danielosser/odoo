/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussSidebarCategoryComponent
        [Model/fields]
            category
        [Model/template]
            root
                header
                    title
                        titleIcon
                        titleText
                    autogrow
                    commands
                        commandView
                        commandAdd
                    counter
                content
                    newItem
                        itemNewInput
                    itemOpen
                    foldedActiveItem
`;
