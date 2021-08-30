/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            dropdownToggleIcon
        [Element/model]
            ChatWindowHiddenMenuComponent
        [Model/traits]
            ChatWindowHiddenMenuComponent/dropdownToggleItem
        [web.Element/class]
            fa
            fa-comments-o
`;
