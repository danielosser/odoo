/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the order mode of the messages on this thread viewer.
        Either 'asc', or 'desc'.
    {Field}
        [Field/name]
            order
        [Field/model]
            ThreadViewer
        [Field/type]
            attr
        [Field/target]
            String
        [Field/default]
            asc
`;
