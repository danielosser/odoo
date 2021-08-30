/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            link: should link and add a record to a non-empty x2many field
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
                            [Record/traits]
                                TestTask
                            [TestTask/id]
                                10
            :task10
                @testEnv
                .{Record/findById}
                    [TestTask/id]
                        10
            :task20
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        TestTask
                    [TestTask/id]
                        20
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/tasks]
                        @testEnv
                        .{Field/add}
                            @task20
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
                        @task10
                [2]
                    the original record should be kept
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/tasks}
                    .{Collection/second}
                    .{=}
                        @task20
                [2]
                    the new record should be added
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/tasks}
                    .{Collection/length}
                    .{=}
                        2
                    .{&}
                        @contact
                        .{TestContact/tasks}
                        .{Collection/includes}
                            @task1
                    .{&}
                        @contact
                        .{TestContact/tasks}
                        .{Collection/includes}
                            @task20
                [2]
                    link: should link and add a record to a non-empty x2many field
            {Test/assert}
                [0]
                    @record
                [1]
                    @task20
                    .{TestTask/responsible}
                    .{=}
                        @contact
                [2]
                    the inverse relation should be set as well
`;
