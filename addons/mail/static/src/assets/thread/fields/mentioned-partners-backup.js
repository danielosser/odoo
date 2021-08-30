/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the last mentioned partners of the last composer related
        to this thread. Useful to sync the composer when re-creating it.
    {Field}
        [Field/name]
            mentionedPartnersBackup
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Partner
`;
