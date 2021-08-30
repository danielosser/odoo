/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            RtcCallViewer/onClick
        [Action/params]
            ev
                [type]
                    MouseEvent
            record
                [type]
                    RtcCallViewer
        [Action/behavior]
            {RtcCallViewer/_showOverlay}
                @record
`;
