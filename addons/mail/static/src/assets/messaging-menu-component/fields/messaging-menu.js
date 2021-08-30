/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messagingMenu
        [Field/model]
            MessagingMenuComponent
        [Field/type]
            m2o
        [Field/target]
            MessagingMenu
        [Field/isRequired]
            true
`;
