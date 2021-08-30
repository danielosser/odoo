/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the last mentioned channels of the last composer related
        to this thread. Useful to sync the composer when re-creating it.
    {Field}
        [Field/name]
            mentionedChannelsBackup
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Thread
`;
