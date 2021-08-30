/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            dialog
        [Field/model]
            DialogComponent
        [Field/type]
            m2o
        [Field/target]
            Dialog
        [Field/isRequired]
            true
`;
