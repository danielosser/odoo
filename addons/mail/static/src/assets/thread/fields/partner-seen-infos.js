/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Contains the seen information for all members of the thread.
        FIXME This field should be readonly once task-2336946 is done.
    {Field}
        [Field/name]
            partnerSeenInfos
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            ThreadPartnerSeenInfo
        [Field/inverse]
            ThreadPartnerSeenInfo/thread
        [Field/isCausal]
            true
`;
