/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            show attachment box
        [Test/model]
            ChatterComponent
        [Test/assertions]
            10
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    res.partner
                [res.partner/id]
                    100
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :chatter
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Chatter
                    [Chatter/id]
                        11
                    [Chatter/threadId]
                        100
                    [Chatter/threadModel]
                        res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ChatterComponent
                [ChatterComponent/chatter]
                    @chatter
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/buttonSendMessage}
                []
                    should have a send message button
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/buttonLogNote}
                []
                    should have a log note button
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterComponents}
                    .{Collection/first}
                    .{ChatterComponent/composer}
                    .{isFalsy}
                []
                    should not have a composer

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/chatterTopbarComponents}
                        .{Collection/first}
                        .{ChatterTopbarComponent/buttonSendMessage}
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterComponents}
                    .{Collection/first}
                    .{ChatterComponent/composer}
                []
                    should have a composer
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatWindow}
                    .{ChatWindow/isFocused}
                []
                    composer 'send message' in chatter should have focus just after being displayed

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/chatterTopbarComponents}
                        .{Collection/first}
                        .{ChatterTopbarComponent/buttonLogNote}
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterComponents}
                    .{Collection/first}
                    .{ChatterComponent/composer}
                []
                    should still have a composer
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatWindow}
                    .{ChatWindow/isFocused}
                []
                    composer 'log note' in chatter should have focus just after being displayed

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/chatterTopbarComponents}
                        .{Collection/first}
                        .{ChatterTopbarComponent/buttonLogNote}
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterComponents}
                    .{Collection/first}
                    .{ChatterComponent/composer}
                    .{isFalsy}
                []
                    should have no composer anymore

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/chatterTopbarComponents}
                        .{Collection/first}
                        .{ChatterTopbarComponent/buttonSendMessage}
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterComponents}
                    .{Collection/first}
                    .{ChatterComponent/composer}
                []
                    should have a composer

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/chatterTopbarComponents}
                        .{Collection/first}
                        .{ChatterTopbarComponent/buttonSendMessage}
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterComponents}
                    .{Collection/first}
                    .{ChatterComponent/composer}
                    .{isFalsy}
                []
                    should have no composer anymore
`;
