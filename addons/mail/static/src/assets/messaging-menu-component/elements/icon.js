/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            icon
        [Element/model]
            MessagingMenuComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-comments
        [web.Element/role]
            img
        [web.Element/aria-label]
            {Locale/text}
                Messages
        [web.Element/style]
            [web.scss/font-size]
                larger
`;
