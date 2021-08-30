/** @odoo-module **/

import { Define } from '@mail/define';

import FormView from 'web.FormView';
import { intercept } from 'web.test_utils_mock';

export default Define`
    {Test}
        [Test/name]
            should open chat window on send chat request to website visitor
        [Test/feature]
            website_livechat
        [Test/model]
            MessagingNotificationHandler
        [Test/assertions]
            3
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    website.visitor
                [website.visitor/display_name]
                    Visitor #11
                [website.visitor/id]
                    11
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
                    ChatWindowManagerComponent
            @testEnv
            .{Record/insert}
                [Record/traits]
                    View
                [arch]
                    {qweb}
                        ${
                            `
                            <form>
                                <header>
                                    <button name="action_send_chat_request" string="Send chat request" class="btn btn-primary" type="button"/>
                                </header>
                                <field name="name"/>
                            </form>
                            `
                        }
                [model]
                    website.visitor
                [res_id]
                    11
                [View]
                    ${FormView}
            ${
                () => {
                    intercept(
                        Define`
                            @record
                            .{Test/widget}
                        `,
                        'execute_action',
                        Define`
                            {func}
                                [in]
                                    payload
                                [out]
                                    @testEnv
                                    .{Env/owlEnv}
                                    .{Dict/get}
                                        services
                                    .{Dict/get}
                                        rpc
                                    .{Function/call}
                                        [route]
                                            /web/dataset/call_button
                                        [params]
                                            [args]
                                                @payload
                                                .{Dict/get}
                                                    data
                                                .{Dict/get}
                                                    env
                                                .{Dict/get}
                                                    resIDs
                                            [kwargs]
                                                [context]
                                                    @payload
                                                    .{Dict/get}
                                                        data
                                                    .{Dict/get}
                                                        env
                                                    .{Dict/get}
                                                        context
                                            [method]
                                                @payload
                                                .{Dict/get}
                                                    data
                                                .{Dict/get}
                                                    action_data
                                                .{Dict/get}
                                                    name
                                            [model]
                                                @payload
                                                .{Dict/get}
                                                    data
                                                .{Dict/get}
                                                    env
                                                .{Doct/get}
                                                    model
                        `,
                    );
                }
            }
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{web.Browser/document}
                        .{web.Document/querySelector}
                            button[name="action_send_chat_request"]
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have a chat window open after sending chat request to website visitor
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/first}
                    .{ChatWindow/isFocused}
                [2]
                    chat window of livechat should be focused on open
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/first}
                    .{ChatWindow/chatWindowHeaderComponents}
                    .{Collection/first}
                    .{ChatWindowHeaderComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        Visitor #11
                [2]
                    chat window of livechat should have name of visitor in the name
`;
