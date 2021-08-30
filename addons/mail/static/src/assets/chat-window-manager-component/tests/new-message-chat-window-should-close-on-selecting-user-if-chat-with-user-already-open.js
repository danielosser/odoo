/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            new message chat window should close on selecting the user if chat with the user is already open
        [Test/model]
            ChatWindowManagerComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        chat
                    [mail.channel/id]
                        20
                    [mail.channel/is_minimized]
                        true
                    [mail.channel/members]
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            131
                    [mail.channel/name]
                        Partner 131
                    [mail.channel/public]
                        private
                    [mail.channel/state]
                        open
                [1]
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        131
                    [res.partner/name]
                        Partner 131
                [2]
                    [Record/traits]
                        res.users
                    [res.users/id]
                        12
                    [res.users/partner_id]
                        131
            :imSearchDef
                {Record/insert}
                    [Record/traits]
                        Deferred
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
                [Server/mockRPC]
                    {func}
                        [in]
                            route
                            args
                            original
                        [out]
                            :res
                                @original
                            {if}
                                @args
                                .{Dict/get}
                                    method
                                .{=}
                                    im_search
                            .{then}
                                {Deferred/resolve}
                                    @imSearchDef
                            @res
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        ChatWindowManagerComponent
                []
                    [Record/traits]
                        MessagingMenuComponent
            {Dev/comment}
                open "new message" chat window
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/toggler}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/newMessageButton}
            {Dev/comment}
                search for a user in "new message" autocomplete
            @testEnv
            .{UI/insertText}
                131
            @testEnv
            .{UI/keydown}
                @testEnv
                .{ChatWindowManager/newMessageChatWindow}
                .{ChatWindow/chatWindowComponents}
                .{Collection/first}
                .{ChatWindowComponent/newMessageFormInput}
            @testEnv
            .{UI/keyup}
                @testEnv
                .{ChatWindowManager/newMessageChatWindow}
                .{ChatWindow/chatWindowComponents}
                .{Collection/first}
                .{ChatWindowComponent/newMessageFormInput}
            {Dev/comment}
                Wait for search RPC to be resolved. The following await lines are
                necessary because autocomplete is an external lib therefore it is
                not possible to use 'afterNextRender'.
            {Promise/await}
                @imSearchDef
            {Utils/nextAnimationFrame}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        .ui-autocomplete
                        .ui-menu-item
                        a
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/newMessageChatWindow}
                    .{isFalsy}
                []
                    'new message' chat window should not be there
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have only one chat window after selecting user whose chat is already open
`;
