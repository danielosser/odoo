/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            clear: should set attribute field the default value
        [Test/model]
            RecordFieldCommand
        [Test/assertions]
            1
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            :task
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        TestTask
                    [TestTask/id]
                        1
                    [TestTask/difficulty]
                        5
            @testEnv
            .{Record/update}
                [0]
                    @task
                [1]
                    [TestTask/difficulty]
                        @testEnv
                        .{Record/empty}
            {Test/assert}
                [0]
                    @record
                [1]
                    @task
                    .{TestTask/difficulty}
                    .{=}
                        1
                [2]
                    clear: should set attribute field the default value
`;
