/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Partner linked to this visitor, if any.
    {Field}
        [Field/name]
            partner
        [Field/model]
            Visitor
        [Field/type]
            m2o
        [Field/target]
            Partner
`;
