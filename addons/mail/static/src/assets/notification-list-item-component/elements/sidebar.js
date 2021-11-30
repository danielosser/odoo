/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebar
        [Element/model]
            NotificationListItemComponent
        [web.Element/style]
            [web.scss/margin]
                {scss/map-get}
                    {scss/$spacers}
                    1
`;
