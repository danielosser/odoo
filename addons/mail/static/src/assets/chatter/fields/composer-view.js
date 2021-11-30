/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the composer view used to post in this chatter (if any).
    {Field}
        [Field/name]
            composerView
        [Field/model]
            Chatter
        [Field/type]
            o2o
        [Field/target]
            ComposerView
        [Field/isCausal]
            true
        [Field/inverse]
            ComposerView/chatter
`;
