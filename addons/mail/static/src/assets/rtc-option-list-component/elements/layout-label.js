/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            layoutLabel
        [Element/model]
            RtcOptionListComponent
        [Model/traits]
            RtcOptionListComponent/label
        [web.Element/textContent]
            {Locale/text}
                Change Layout
`;
