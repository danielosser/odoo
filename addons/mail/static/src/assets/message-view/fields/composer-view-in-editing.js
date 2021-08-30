/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the composer that is used to edit this message (if any).
    {Field}
        [Field/name]
            composerViewInEditing
        [Field/model]
            MessageView
        [Field/type]
            o2o
        [Field/target]
            ComposerView
        [Field/isCausal]
            true
        [Field/inverse]
            ComposerView/messageViewInEditing
`;
