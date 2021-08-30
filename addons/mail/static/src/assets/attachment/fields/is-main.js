/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isMain
        [Field/model]
            Attachment
        [Field/type]
            attr
        [Field/target]
            Boolean
`;
