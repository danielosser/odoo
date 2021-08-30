/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            RtcControllerComponent
        [Model/fields]
            rtcController
        [Model/template]
            root
                buttons
                    micButton
                        micButtonIconWrapper
                            micButtonIcon
                    headphoneButton
                        headphoneButtonIconWrapper
                            headphoneButtonIcon
                    cameraButton
                        cameraButtonIconWrapper
                            cameraButtonIcon
                    screenButton
                        screenButtonIconWrapper
                            screenButtonIcon
                    popover
                        {Dev/comment}
                            moreButton - button
                                moreButtonIconWrapper - buttonIconWrapper
                                    moreButtonIcon - buttonIcon
                    joinCallButton
                        joinCallButtonIconWrapper
                            joinCallButtonIcon
                    rejectCallButton
                        rejectCallButtonIconWrapper
                            rejectCallButtonIcon
                    toggleCallButton
                        toggleCallButtonIconWrapper
                            toggleCallButtonIcon
`;
