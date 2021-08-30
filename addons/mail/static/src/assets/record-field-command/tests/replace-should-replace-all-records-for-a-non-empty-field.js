/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            replace: should replace all records for a non-empty field
        [Test/model]
            RecordFieldCommand
        [Test/assertions]
            5
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            :contact
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        TestContact
                    [TestContact/id]
                        10
                    [TestContact/tasks]
                        @testEnv
                        .{Record/insert}
                            []
                                [Record/traits]
                                    TestTask
                                [TestTask/id]
                                    10
                            []
                                [Record/traits]
                                    TestTask
                                [TestTask/id]
                                    20
            :task10
                @testEnv
                .{Record/findById}
                    [TestTask/id]
                        10
            :task20
                @testEnv
                .{Record/findById}
                    [TestTask/id]
                        20
            :task30
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        TestTask
                    [TestTask/id]
                        30
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/tasks]
                        @task30
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/tasks}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have 1 record
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/tasks}
                    .{Collection/first}
                    .{=}
                        @task30
                [2]
                    should be replaced with the new record
            {Test/assert}
                [0]
                    @record
                [1]
                    @task30
                    .{TestTask/responsible}
                    .{=}
                        @contact
                [2]
                    the inverse relation should be set as well
            {Test/assert}
                [0]
                    @record
                [1]
                    @task10
                    .{TestTask/responsible}
                    .{=}
                        undefined
                [2]
                    the original relation should be dropped
            {Test/assert}
                [0]
                    @record
                [1]
                    @task20
                    .{TestTask/responsible}
                    .{=}
                        undefined
                [2]
                    the original relation should be dropped
`;
