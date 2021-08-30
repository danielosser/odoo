/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonTitle
        [Element/model]
            RtcActivityNoticeComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Rtc/channel}
            .{Thread/displayName}
        [web.Element/style]
            {web.scss/include}
                {web.scss/text-truncate}
`;
