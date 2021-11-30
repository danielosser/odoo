/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separatorLabel
        [Element/model]
            MessageListComponent
        [web.Element/style]
            [web.scss/padding]
                [0]
                    {scss/map-get}
                        {scss/$spacers}
                        0
                [1]
                    {scss/map-get}
                        {scss/$spacers}
                        3
            [web.scss/background-color]
                {scss/$white}
`;
