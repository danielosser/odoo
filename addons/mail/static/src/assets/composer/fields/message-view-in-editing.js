/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageViewInEditing
        [Field/model]
            Composer
        [Field/type]
            o2o
        [Field/target]
            MessageView
        [Field/isReadonly]
            true
        [Field/inverse]
            MessageView/composerForEditing
`;
