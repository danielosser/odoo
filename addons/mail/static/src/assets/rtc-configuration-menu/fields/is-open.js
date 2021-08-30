/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isOpen
        [Field/model]
            RtcConfigurationMenu
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
