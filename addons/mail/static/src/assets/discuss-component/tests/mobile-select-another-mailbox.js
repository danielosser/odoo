/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mobile: select another mailbox
        [Test/model]
            DiscussComponent
        [Test/assertions]
            7
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/owlEnv]
                        [browser]
                            [innerHeight]
                                640
                            [innerWidth]
                                360
                        [device]
                            [isMobile]
                                true
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should display discuss initially
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Device/isMobile}
                [2]
                    discuss should be opened in mobile mode
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                [2]
                    discuss should display a thread initially
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{=}
                        @testEnv
                        .{Env/inbox}
                [2]
                    inbox mailbox should be opened initially
            {Test/containsOnce}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            DiscussMobileMailboxSelectionComponent
                    .{Collection/first}
                    .{DiscussMobileMailboxSelectionComponent/button}
                    .{Collection/find}
                        {func}
                            [in]
                                button
                            [out]
                                @button
                                .{Button/mailbox}
                                .{=}
                                    @testEnv
                                    .{Env/starred}
                [2]
                    should have a button to open starred mailbox

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/all}
                            [Record/traits]
                                DiscussMobileMailboxSelectionComponent
                        .{Collection/first}
                        .{DiscussMobileMailboxSelectionComponent/button}
                        .{Collection/find}
                            {func}
                                [in]
                                    button
                                [out]
                                    @button
                                    .{Button/mailbox}
                                    .{=}
                                        @testEnv
                                        .{Env/starred}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                [2]
                    discuss should still have a thread after clicking on starred mailbox
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{=}
                        @testEnv
                        .{Env/starred}
                [2]
                    starred mailbox should be opened after clicking on it
`;
