/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separatorLabelNewMessages
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            span
        [Model/traits]
            MessageListComponent/separatorLabel
        [web.Element/textContent]
            {Locale/text}
                New messages
`;
