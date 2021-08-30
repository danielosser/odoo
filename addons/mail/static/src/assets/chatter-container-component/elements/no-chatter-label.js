/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            noChatterLabel
        [Element/model]
            ChatterContainerComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Please wait...
`;
