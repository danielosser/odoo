/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            log note/send message switching
        [Test/model]
            ChatterTopbarComponent
        [Test/assertions]
            8
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
                    ChatterTopbarComponent
                [ChatterTopbarComponent/chatter]
                    @chatter
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have a 'Send Message' button
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/isButtonSendActive}
                    .{isFalsy}
                []
                    'Send Message' button should not be active
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/buttonLogNote}
                []
                    should have a 'Log Note' button
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/isButtonLogActive}
                    .{isFalsy}
                []
                    'Log Note' button should not be active

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
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/isButtonSendActive}
                []
                    'Send Message' button should be active
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/isButtonLogActive}
                    .{isFalsy}
                []
                    'Log Note' button should not be active

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
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/isButtonSendActive}
                    .{isFalsy}
                []
                    'Send Message' button should not be active
            {Test/assert}
                []
                    @chatter
                    .{Chatter/chatterTopbarComponents}
                    .{Collection/first}
                    .{ChatterTopbarComponent/isButtonLogActive}
                []
                    'Log Note' button should be active
`;
