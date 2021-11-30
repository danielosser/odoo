/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        callback to properly end the audio monitoring.
        If set it indicates that we are currently monitoring the local
        audioTrack for the voice activation feature.
    {Field}
        [Field/name]
            _disconnectAudioMonitor
        [Field/model]
            Rtc
        [Field/type]
            attr
        [Field/target]
            Function
`;
