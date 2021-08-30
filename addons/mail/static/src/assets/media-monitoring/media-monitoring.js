/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MediaMonitoring
        [Model/actions]
            MediaMonitoring/_getFrequencyIndex
            MediaMonitoring/_loadAudioWorkletProcessor
            MediaMonitoring/_loadScriptProcessor
            MediaMonitoring/getFrequencyAverage
            MediaMonitoring/monitorAudio
`;
