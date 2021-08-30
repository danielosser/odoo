/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Handles click on the "enable microphone" button.
    {Action}
        [Action/name]
            MediaPreview/onClickEnableMicrophoneButton
        [Action/params]
            record
                [type]
                    MediaPreview
        [Action/behavior]
            {MediaPreview/enableMicrophone}
                @record
`;
