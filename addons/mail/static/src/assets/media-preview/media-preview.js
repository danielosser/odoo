/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MediaPreview
        [Model/fields]
            audioRef
            audioStream
            doesBrowserSupportMediaDevices
            isMicrophoneEnabled
            isVideoEnabled
            videoRef
            videoStream
        [Model/id]
            MediaPreview/messaging
        [Model/actions]
            MediaPreview/disableMicrophone
            MediaPreview/disableVideo
            MediaPreview/enableMicrophone
            MediaPreview/enableVideo
            MediaPreview/onClickDisableMicrophoneButton
            MediaPreview/onClickDisableVideoButton
            MediaPreview/onClickEnableMicrophoneButton
            MediaPreview/onClickEnableVideoButton
            MediaPreview/stopTracksOnMediaStream
`;
