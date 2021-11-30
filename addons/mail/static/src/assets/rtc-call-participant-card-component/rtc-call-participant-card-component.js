/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            RtcCallParticipantCardComponent
        [Model/fields]
            callParticipantCard
        [Model/template]
            root
                container
                    rtcVideo
                    avatarFrame
                        avatarImage
                    overlayBottom
                        name
                        liveIndicatorBottom
                    overlayTop
                        mic
                            micIcon
                        headphone
                            headphoneIcon
                        audioError
                            audioErrorIcon
                        connectionState
                            connectionStateIcon
                        liveIndicatorTop
                    volumeMenuAnchor
                        {Dev/comment}
                            volumeMenuAnchorPopover
                                volumeMenuAnchorIcon
        [Model/actions]
            RtcCallParticipantCardComponent/_onContextmenu
`;
