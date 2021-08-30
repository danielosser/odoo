/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            core
        [Element/model]
            NotificationListItemComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/color]
                {scss/gray}
                    500
`;
