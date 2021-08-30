/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            replace: should order the existing records for x2many field
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
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/tasks]
                        [0]
                            @task20
                        [1]
                            @task10
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/tasks}
                    .{Collection/length}
                    .{=}
                        2
                [2]
                    should have 2 records
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/tasks}
                    .{Collection/first}
                    .{=}
                        @task20
                [2]
                    records should be re-ordered
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/tasks}
                    .{Collection/second}
                    .{=}
                        @task10
                [2]
                    records should be re-ordered
`;
