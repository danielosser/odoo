/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            insert: should create and replace a new record for a non-empty x2one field
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
                    [TestContact/address]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                TestAddress
                            [TestAddress/id]
                                10
                    [TestContact/id]
                        10
            :address10
                @testEnv
                .{Record/findById}
                    [TestAddress/id]
                        10
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/address]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                TestAddress
                            [TestAddress/id]
                                20
            :address20
                @testEnv
                .{Record/findById}
                    [TestAddress/id]
                        20
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/address}
                    .{=}
                        @address20
                [2]
                    insert: should create and replace a new record for a non-empty x2one field
            {Test/assert}
                [0]
                    @record
                [1]
                    @address20
                    .{TestAddress/contact}
                    .{=}
                        @contact
                [2]
                    the inverse relation should be set as well
            {Test/assert}
                [0]
                    @record
                [1]
                    @address10
                    .{TestAddress/contact}
                    .{=}
                        undefined
                [2]
                    the original relation should be dropped
`;
