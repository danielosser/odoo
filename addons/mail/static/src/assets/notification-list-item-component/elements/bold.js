/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            bold
        [Element/model]
            NotificationListItemComponent
        [web.Element/style]
            [web.scss/font-weight]
                bold
`;
