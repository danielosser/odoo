/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            fullscreenLabel
        [Element/model]
            RtcOptionListComponent
        [Model/traits]
            RtcOptionListComponent/label
        [web.Element/textContent]
            {Locale/text}
                Full screen
`;
