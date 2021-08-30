/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            insert: should update existing records for an x2many field
        [Test/model]
            RecordFieldCommand
        [Test/assertions]
            3
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
                            [Record/traits]
                                TestTask
                            [TestTask/id]
                                10
                            [TestTask/title]
                                task 10
            :task
                @testEnv
                .{Record/findById}
                    [TestTask/id]
                        10
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/tasks]
                        @testEnv
                        .{Field/add}
                            @testEnv
                            .{Recod/insert}
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
                        @task
                [2]
                    the original task should be kept
            {Test/assert}
                [0]
                    @record
                [1]
                    @task
                    .{TestTask/title}
                    .{=}
                        task 10 updated
                [2]
                    should update the existing record
`;
