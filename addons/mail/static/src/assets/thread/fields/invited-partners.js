/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        List of partners that have been invited to the RTC call of this channel.
    {Field}
        [Field/name]
            invitedPartners
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Partner
`;
