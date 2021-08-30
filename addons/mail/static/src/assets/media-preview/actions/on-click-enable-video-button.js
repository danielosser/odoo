/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Handles click on the "enable video" button.
    {Action}
        [Action/name]
            MediaPreview/onClickEnableVideoButton
        [Action/params]
            record
                [type]
                    MediaPreview
        [Action/behavior]
            {MediaPreview/enableVideo}
                @record
`;
