/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            windowCounter
        [Element/model]
            ChatWindowHiddenMenuComponent
        [Model/traits]
            ChatWindowHiddenMenuComponent/dropdownToggleItem
        [web.Element/class]
            text-truncate
        [web.Element/textContent]
            {ChatWindowManager/allOrderedHidden}
            .{Collection/length}
        [web.Element/style]
            [web.scss/margin-left]
                {scss/map-get}
                    {scss/$spacers}
                    1
            [web.scss/user-select]
                none
`;
