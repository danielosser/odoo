/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            threadModel
        [Field/model]
            ChatterContainerComponent
        [Field/type]
            attr
        [Field/target]
            String
        [Field/isRequired]
            true
`;
