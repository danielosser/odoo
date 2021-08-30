/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            noThreadMobile
        [Element/model]
            DiscussComponent
        [Model/traits]
            DiscussComponent/noThread
        [Element/isPresent]
            {Messaging/isInitialized}
            .{&}
                {Device/isMobile}
            .{&}
                {Discuss/thread}
                .{isFalsy}
            .{&}
                {Discuss/activeMobileNavbarTabId}
                .{=}
                    mailbox
        [web.Element/textContent]
            {Locale/text}
                No conversation selected.
`;
