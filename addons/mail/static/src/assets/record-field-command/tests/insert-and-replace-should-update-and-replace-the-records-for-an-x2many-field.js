/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            insertAndReplace: should update and replace the records for an x2many field
        [Test/model]
            RecordFieldCommand
        [Test/assertions]
            4
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
                                [TestTask/title]
                                    task 10
                            []
                                [Record/traits]
                                    TestTask
                                [TestTask/id]
                                    20
                                [TestTask/title]
                                    task 20
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
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/tasks]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                TestTask
                            [TestTask/id]
                                10
                            [TestTask/title]
                                task 10 updated
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
                        @task10
                [2]
                    tasks should be replaced by new record
            {Test/assert}
                [0]
                    @record
                [1]
                    @task10
                    .{TestTask/title}
                    .{=}
                        task 10 updated
                [2]
                    the record should be updated
            {Test/assert}
                [0]
                    @record
                [1]
                    @task20
                    .{TestTask/responsible}
                    .{=}
                        undefined
                [2]
                    the record should be replaced
`;
