/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            showOnlyVideoText
        [Element/model]
            RtcLayoutMenuComponent
        [Model/traits]
            RtcLayoutMenuComponent/text
        [web.Element/textContent]
            {Locale/text}
                Show only video
`;
