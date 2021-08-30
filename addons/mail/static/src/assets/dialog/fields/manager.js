/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            manager
        [Field/model]
            Dialog
        [Field/type]
            m2o
        [Field/target]
            DialogManager
        [Field/inverse]
            DialogManager/dialogs
        [Field/isReadonly]
            true
`;
