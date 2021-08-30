/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Handles click on the "stop replying" button.
    {Action}
        [Action/name]
            ComposerView/onClickStopReplying
        [Action/params]
            record
                [type]
                    ComposerView
            ev
                [type]
                    MouseEvent
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                    .{ComposerView/threadView}
                [1]
                    [ThreadView/replyingToMessageView]
                        {Record/empty}
`;