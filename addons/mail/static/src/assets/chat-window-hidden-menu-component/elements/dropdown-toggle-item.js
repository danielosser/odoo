/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            dropdownToggleItem
        [Element/model]
            ChatWindowHiddenMenuComponent
        [web.Element/style]
            [web.scss/margin]
                [0]
                    {scss/map-get}
                        {scss/$spacers}
                        0
                [1]
                    {scss/map-get}
                        {scss/$spacers}
                        1
`;
