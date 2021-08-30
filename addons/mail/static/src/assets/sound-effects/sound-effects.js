/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            SoundEffects
        [Model/fields]
            channelJoin
            channelLeave
            incomingCall
            memberLeave
            newMessage
            pushToTalk
            screenSharing
        [Model/id]
            SoundEffects/messaging
`;
