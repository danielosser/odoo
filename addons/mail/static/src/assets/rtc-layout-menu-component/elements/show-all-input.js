/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            showAllInput
        [Element/model]
            RtcLayoutMenuComponent
        [Model/traits]
            RtcLayoutMenuComponent/input
        [web.Element/name]
            filter
        [web.Element/value]
            all
        [Element/onClick]
            {RtcLayoutMenu/onClickFilter}
                [0]
                    @record
                    .{RtcLayoutMenuComponent/layoutMenu}
                [1]
                    @ev
        [web.Element/isChecked]
            @record
            .{RtcLayoutMenuComponent/layoutMenu}
            .{RtcLayoutMenu/callViewer}
            .{RtcCallViewer/filterVideoGrid}
            .{isFalsy}
`;
