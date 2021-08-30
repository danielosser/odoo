/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            composerForEditing
        [Field/model]
            MessageView
        [Field/type]
            o2o
        [Field/target]
            Composer
        [Field/isCausal]
            true
        [Field/inverse]
            Composer/messageViewInEditing
`;
