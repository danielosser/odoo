/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            alertLoadingFailedText
        [Element/model]
            MessageListComponent
        [web.Element/textContent]
            {Locale/text}
                An error occurred while fetching messages.
`;
