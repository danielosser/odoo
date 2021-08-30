/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the message view on which this composer allows editing (if any).
    {Field}
        [Field/name]
            messageViewInEditing
        [Field/model]
            ComposerView
        [Field/type]
            o2o
        [Field/target]
            MessageView
        [Field/isReadonly]
            true
        [Field/inverse]
            MessageView/composerViewInEditing
`;
