/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            replace: should link a record for an empty x2many field
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
            :task
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        TestTask
                    [TestTask/id]
                        10
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/tasks]
                        @task
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
                    the new record should be linked
            {Test/assert}
                [0]
                    @record
                [1]
                    @task
                    .{TestTask/responsible}
                    .{=}
                        @contact
                [2]
                    the inverse relation should be dropped
`;
