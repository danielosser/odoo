/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Browsing history of the visitor as a string.
    {Field}
        [Field/name]
            history
        [Field/model]
            Visitor
        [Field/type]
            attr
        [Field/target]
            String
`;
