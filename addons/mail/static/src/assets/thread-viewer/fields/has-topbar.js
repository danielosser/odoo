/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether this thread viewer has a top bar.
    {Field}
        [Field/name]
            hasTopbar
        [Field/model]
            ThreadViewer
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
