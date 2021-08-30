/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Handles click on the "disable microphone" button.
    {Action}
        [Action/name]
            MediaPreview/onClickDisableMicrophoneButton
        [Action/params]
            record
                [type]
                    MediaPreview
        [Action/behavior]
            {MediaPreview/disableMicrophone}
                @record
`;
