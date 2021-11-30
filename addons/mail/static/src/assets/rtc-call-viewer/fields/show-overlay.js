/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines if we show the overlay with the control buttons.
    {Field}
        [Field/name]
            showOverlay
        [Field/model]
            RtcCallViewer
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
