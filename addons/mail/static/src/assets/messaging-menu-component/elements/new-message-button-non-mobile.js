/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            newMessageButtonNonMobile
        [Element/model]
            MessagingMenuComponent
        [web.Element/tag]
            button
        [web.Element/class]
            btn
            btn-link
        [Element/isPresent]
            {Device/isMobile}
            .{isFalsy}
            .{&}
                {Discuss/isOpen}
                .{isFalsy}
        [Element/onClick]
            {ChatWindowManager/openNewMessage}
            {MessagingMenu/close}
        [web.Element/type]
            button
        [web.Element/textContent]
            {Locale/text}
                New message
`;
