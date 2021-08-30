/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messagingNotInitialized
        [Element/model]
            DiscussComponent
        [Element/isPresent]
            {Messaging/isInitialized}
            .{isFalsy}
        [web.Element/style]
            [web.scss/flex]
                1
                1
                auto
            [web.scss/display]
                flex
            [web.scss/align-items]
                center
            [web.scss/justify-content]
                center
`;
