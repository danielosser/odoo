/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            noThreadNonMobile
        [Element/model]
            DiscussComponent
        [Model/traits]
            DiscussComponent/noThread
        [Element/isPresent]
            @record
            .{DiscussComponent/discuss}
            .{Discuss/thread}
            .{isFalsy}
        [web.Element/textContent]
            {Locale/text}
                No conversation selected.
`;
