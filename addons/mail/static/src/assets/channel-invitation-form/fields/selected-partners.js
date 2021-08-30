/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines all partners that are currently selected.
    {Field}
        [Field/name]
            selectedPartners
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            m2m
        [Field/target]
            Partner
`;