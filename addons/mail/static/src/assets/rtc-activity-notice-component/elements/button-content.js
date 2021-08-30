/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonContent
        [Element/model]
            RtcActivityNoticeComponent
        [web.Element/style]
            [web.scss/max-width]
                150px
            [web.scss/align-items]
                center
            [web.scss/display]
                flex
`;
