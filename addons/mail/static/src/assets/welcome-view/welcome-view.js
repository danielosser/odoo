/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            WelcomeView
        [Model/fields]
            channel
            discussPublicView
            guestNameInputRef
            guestNameInputUniqueId
            hasGuestNameChanged
            isDoFocusGuestNameInput
            isJoinButtonDisabled
            mediaPreview
            originalGuestName
            pendingGuestName
        [Model/id]
            WelcomeView/messaging
        [Model/actions]
            WelcomeView/_handleFocus
            WelcomeView/_updateGuestNameWithInputValue
            WelcomeView/getNextGuestNameInputId
            WelcomeView/joinChannel
            WelcomeView/onClickJoinButton
            WelcomeView/onComponentUpdate
            WelcomeView/onInputGuestNameInput
            WelcomeView/onKeydownGuestNameInput
            WelcomeView/updateGuestNameIfAnyThenJoinChannel
`;
