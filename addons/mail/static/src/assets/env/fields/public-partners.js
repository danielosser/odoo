/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines which partners should be considered the public partners,
        which are special partners notably used in livechat.
    {Field}
        [Field/name]
            publicPartners
        [Field/model]
            Env
        [Field/type]
            m2m
        [Field/target]
            Partner
`;
