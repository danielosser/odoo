/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasBackground
        [Field/model]
            PartnerImStatusIconComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
