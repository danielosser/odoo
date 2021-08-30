/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The model for the menu to control the layout of the viewer.
    {Field}
        [Field/name]
            rtcLayoutMenu
        [Field/model]
            RtcCallViewer
        [Field/type]
            o2o
        [Field/target]
            RtcLayoutMenu
        [Field/isCausal]
            true
        [Field/inverse]
            RtcLayoutMenu/callViewer
`;
