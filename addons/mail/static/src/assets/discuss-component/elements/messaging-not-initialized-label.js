/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messagingNotInitializedLabel
        [Element/model]
            DiscussComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Please wait..
`;
