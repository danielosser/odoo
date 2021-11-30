/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether this composer should be focused at next render.
    {Field}
        [Field/name]
            doFocus
        [Field/model]
            ComposerView
        [Field/type]
            attr
        [Field/target]
            Boolean
`;
