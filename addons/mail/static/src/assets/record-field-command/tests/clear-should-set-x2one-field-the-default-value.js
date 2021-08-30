/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            clear: should set x2one field the default value
        [Test/model]
            RecordFieldCommand
        [Test/assertions]
            1
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
                    [TestContact/favorite]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                TestHobby
                            [TestHobby/description]
                                pingpong
                    [TestContact/id]
                        10
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/favorite]
                        @testEnv
                        .{Record/empty}
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestHobby/description}
                    .{TestContact/favorite}
                    .{=}
                        football
                [2]
                    clear: should set x2one field default value
`;
