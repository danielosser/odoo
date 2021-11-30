/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Notifies the server and does the cleanup of the current call.
    {Action}
        [Action/name]
            Thread/leaveCall
        [Action/params]
            record
                [type]
                    Thread
        [Action/behavior]
            {Thread/performLeaveCall}
                @record
`;
