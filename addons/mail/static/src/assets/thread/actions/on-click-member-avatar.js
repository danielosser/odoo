/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Handles click on the avatar of the given member in the member list of
        this channel.
    {Action}
        [Action/name]
            Thread/onClickMemberAvatar
        [Action/params]
            record
                [type]
                    Thread
            member
                [type]
                    Partner
        [Action/behavior]
            {Partner/openChat}
                @member
`;
