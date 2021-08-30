/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        List of guests that have been invited to the RTC call of this channel.
        FIXME should be simplified if we have the mail.channel.partner model
        in which case the two following fields should be a single relation to that
        model.
    {Field}
        [Field/name]
            invitedGuests
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Guest
`;
