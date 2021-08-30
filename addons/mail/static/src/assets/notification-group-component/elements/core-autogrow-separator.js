/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            coreAutogrowSeparator
        [Element/model]
            NotificationGroupComponent
        [web.Element/tag]
            span
        [Model/traits]
            AutogrowComponent
`;
