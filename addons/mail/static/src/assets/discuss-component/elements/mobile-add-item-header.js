/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mobileAddItemHeader
        [Element/model]
            DiscussComponent
        [Element/isPresent]
            {Messaging/isInitialized}
            .{&}
                {Device/isMobile}
            .{&}
                {Discuss/isAddingChannel}
                .{|}
                    {Discuss/isAddingChat}
        [web.Element/class]
            border-bottom
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/justify-content]
                center
            [web.scss/width]
                {scss/map-get}
                    {scss/$sizes}
                    100
            [web.scss/padding]
                {scss/map-get}
                    {scss/$spacers}
                    0
`;
