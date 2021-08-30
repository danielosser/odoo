/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            date
        [Element/model]
            NotificationListItemComponent
        [Model/traits]
            NotificationListItemComponent/bold
        [web.Element/style]
            [web.scss/flex]
                0
                0
                auto
            [web.scss/font-size]
                x-small
            [web.scss/color]
                {scss/gray}
                    500
`;
