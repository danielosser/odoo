/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            basic rendering
        [Test/model]
            MessageViewComponent
        [Test/assertions]
            11
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :message
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Message
                    [Message/author]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Partner
                            [Partner/displayName]
                                Demo User
                            [Partner/id]
                                7
                    [Message/body]
                        <p>Test</p>
                    [Message/date]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Moment
                    [Message/id]
                        100
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessageViewComponent
                [MessageViewComponent/message]
                    @message
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should display a message component
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/sidebar}
                [2]
                    message should have a sidebar
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorAvatar}
                [2]
                    message should have author avatar in the sidebar
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorAvatar}
                    .{web.Element/tag}
                    .{=}
                        img
                [2]
                    message author avatar should be an image
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorAvatar}
                    .{web.Element/src}
                    .{=}
                        /web/image/res.partner/7/avatar_128
                [2]
                    message author avatar should GET image of the related partner
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorName}
                [2]
                    message should display author name
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorName}
                    .{web.Element/textContent}
                    .{=}
                        Demo User
                [2]
                    message should display correct author name
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/date}
                [2]
                    message should display date

            @testEnv
            .{UI/click}
                @message
                .{Message/messageComponents}
                .{Collection/first}
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/actionList}
                    .{MessageActionList/messageActionListComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    message should display list of actions
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/content}
                [2]
                    message should display the content
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/prettyBody}
                    .{web.Element/htmlContent}
                    .{=}
                        <p>Test</p>
                [2]
                    message should display the correct content
`;
