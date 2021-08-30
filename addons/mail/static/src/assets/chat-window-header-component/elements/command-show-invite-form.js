/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandShowInviteForm
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
                .{isFalsy}
        [Element/onClick]
            {ChatWindow/onClickShowInviteForm}
                [0]
                    @record
                    .{ChatWindowHeaderComponent/chatWindow}
                [1]
                    @ev
        [web.Element/title]
            {Locale/text}
                Add users
`;
