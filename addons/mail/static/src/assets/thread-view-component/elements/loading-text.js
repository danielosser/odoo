/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            loadingText
        [Element/model]
            ThreadViewComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Loading...
`;
