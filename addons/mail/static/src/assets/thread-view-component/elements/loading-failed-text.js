/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            loadingFailedText
        [Element/model]
            ThreadViewComponent
        [web.Element/textContent]
            {Locale/text}
                An error occurred while fetching messages.
`;
