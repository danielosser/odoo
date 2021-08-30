/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States whether followers have been loaded at least once for this
        thread.
    {Field}
        [Field/name]
            areFollowersLoaded
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
