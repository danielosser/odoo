/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States all partners that are potential choices according to this
        search term.
    {Field}
        [Field/name]
            selectablePartners
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            m2m
        [Field/target]
            Partner
`;