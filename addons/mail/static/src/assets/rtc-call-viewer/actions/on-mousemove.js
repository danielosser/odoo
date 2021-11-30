/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            RtcCallViewer/onMousemove
        [Action/params]
            ev
                [type]
                    MouseEvent
            record
                [type]
                    RtcCallViewer
        [Action/behavior]
            {if}
                {Record/exists}
                    @record
                .{isFalsy}
            .{then}
                {break}
            {if}
                {Event/isHandled}
                    [0]
                        @ev
                    [1]
                        RtcCallViewer/onMousemoveOverlay
            .{then}
                {break}
            {RtcCallViewer/_showOverlay}
                @record
`;
