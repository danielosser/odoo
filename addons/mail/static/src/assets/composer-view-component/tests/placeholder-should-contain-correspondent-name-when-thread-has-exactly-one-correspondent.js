/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            placeholder should contain correspondent name when thread has exactly one correspondent
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            1
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
                    [mail.channel/members]
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            7
                [1]
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        7
                    [res.partner/name]
                        Marc Demo
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :thread
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ComposerViewComponent
                [ComposerViewComponent/composer]
                    @thread
                    .{Thread/composer}
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/placeholder}
                    .{=}
                        Message Marc Demo...
                []
                    should have 'Message Marc Demo...' as placeholder for composer text input when thread has exactly one correspondent
`;
