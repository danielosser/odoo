/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Changes the category open states when clicked.
    {Action}
        [Action/name]
            DiscussSidebarCategory/onHideAddingItem
        [Action/params]
            ev
                [type]
                    web.CustomEvent
            record
                [type]
                    DiscussSidebarCategory
        [Action/behavior]
            {web.Event/stopPropagation}
                @ev
            {Record/update}
                [0]
                    @record
                [1]
                    [DiscussSidebarCategory/isAddingItem]
                        false
`;