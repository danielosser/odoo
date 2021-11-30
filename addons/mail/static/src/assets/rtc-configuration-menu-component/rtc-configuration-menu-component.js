/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            RtcConfigurationMenuComponent
        [Model/fields]
            userDevices
        [Model/template]
            root
                inputDevice
                    inputDeviceLabel
                        inputDeviceName
                        inputDeviceSelectionContainer
                            inputDeviceSelection
                                inputDeviceOptionDefault
                                inputDeviceOption
                ptt
                    pttLabel
                        pttName
                        pttCheckbox
                pttKey
                    pttKeyLabel
                        pttKeyName
                        pttGroup
                            pttGroupKey
                            pttRegisteringButton
                                pttRegisteringButtonIcon
                pttRegisteringText
                pttDelay
                    pttDelayLabel
                        pttDelayName
                        pttDelayGroup
                            pttDelayInput
                            pttDelayValue
                voiceDetection
                    voiceDetectionLabel
                        voiceDetectionName
                        voiceDetectionGroup
                            voiceDetectionInput
                            voiceDetectionValue
        [Model/actions]
            RtcConfigurationMenuComponent/_onChangeDelay
            RtcConfigurationMenuComponent/_onChangePushToTalk
            RtcConfigurationMenuComponent/_onChangeSelectAudioInput
            RtcConfigurationMenuComponent/_onChangeThreshold
            RtcConfigurationMenuComponent/_onClickRegisterKeyButton
`;
