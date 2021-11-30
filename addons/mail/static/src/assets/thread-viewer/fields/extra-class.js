/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines which extra class this thread view component should have.
    {Field}
        [Field/name]
            extraClass
        [Field/model]
            ThreadViewer
        [Field/related]
            attr
        [Field/target]
            String
`;
