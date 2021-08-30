/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            listItem
        [Element/model]
            ChatWindowHiddenMenuComponent:listItem
        [web.Element/tag]
            li
        [web.Element/role]
            menuitem
        [web.Element/style]
            {web.scss/selector}
                [0]
                    &:not(:last-child)
                [1]
                    [web.scss/border-bottom]
                        {scss/$border-width}
                        solid
                        {scss/$border-color}
`;
