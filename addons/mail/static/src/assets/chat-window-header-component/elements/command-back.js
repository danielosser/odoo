/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandBack
        [Element/model]
            ChatWindowHeaderComponent
        [web.Element/style]
            [web.scss/margin-right]
                {scss/map-get}
                    {scss/$spacers}
                    2
`;
