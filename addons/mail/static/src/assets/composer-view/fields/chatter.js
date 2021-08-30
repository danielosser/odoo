/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the chatter which this composer allows editing (if any).
    {Field}
        [Field/name]
            chatter
        [Field/model]
            ComposerView
        [Field/type]
            o2o
        [Field/target]
            Chatter
        [Field/isReadonly]
            true
        [Field/inverse]
            Chatter/composerView
`;