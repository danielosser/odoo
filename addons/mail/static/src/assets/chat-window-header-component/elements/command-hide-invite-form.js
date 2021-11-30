/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandHideInviteForm
        [Element/model]
            ChatWindowHeaderComponent
        [Model/traits]
            ChatWindowHeaderComponent/command
        [Element/isPresent]
            @record
            .{ChatWindowHeaderComponent/chatWindow}
            .{ChatWindow/hasInviteFeature}
            .{&}
                @record
                .{ChatWindowHeaderComponent/chatWindow}
                .{ChatWindow/channelInvitationForm}
        [Element/onClick]
            {ChatWindow/onClickHideInviteForm}
                [0]
                    @record
                    .{ChatWindowHeaderComponent/chatWindow}
                [1]
                    @ev
        [web.Element/title]
            {Locale/text}
                Stop adding users
`;
