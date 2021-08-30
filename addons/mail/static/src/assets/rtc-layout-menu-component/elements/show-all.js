/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            showAll
        [Element/model]
            RtcLayoutMenuComponent
        [Model/traits]
            RtcLayoutMenuComponent/item
        [Element/isPresent]
            @record
            .{RtcLayoutMenuComponent/layoutMenu}
            .{RtcLayoutMenu/callViewer}
            .{RtcCallViewer/threadView}
            .{ThreadView/thread}
            .{Thread/videoCount}
            .{>}
                0
`;
