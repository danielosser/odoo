/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            headerAutogrowSeparator
        [Element/model]
            NotificationGroupComponent
        [web.Element/tag]
            span
        [Model/traits]
            AutogrowComponent
`;
