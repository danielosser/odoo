/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            unlink: should unlink the record for x2one field
        [Test/model]
            RecordFieldCommand
        [Test/assertions]
            2
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
            :address
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
                        .{Record/empty}
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/address}
                    .{=}
                        undefined
                [2]
                    unlink: should unlink the record for x2one field
            {Test/assert}
                [0]
                    @record
                [1]
                    @address
                    .{TestAddress/contact}
                    .{=}
                        undefined
                [2]
                    the original relation should be dropped as well
`;
