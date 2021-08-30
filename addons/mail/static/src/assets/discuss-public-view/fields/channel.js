/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the channel linked to this discuss public view.
    {Field}
        [Field/name]
            channel
        [Field/model]
            DiscussPublicView
        [Field/type]
            o2o
        [Field/target]
            Thread
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;
