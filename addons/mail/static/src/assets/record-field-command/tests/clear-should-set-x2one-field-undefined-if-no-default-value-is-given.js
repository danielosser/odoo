/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            clear: should set x2one field undefined if no default value is given
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
                    [TestContact/id]
                        10
                    [TestContact/address]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                TestAddress
                            [TestAddress/id]
                                20
            :address
                @testEnv
                .{Record/findById}
                    [TestAddress/id]
                        20
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
                    clear: should set x2one field undefined
            {Test/assert}
                [0]
                    @record
                [1]
                    @address
                    .{TestAddress/contact}
                    .{=}
                        undefined
                [2]
                    the inverse relation should be cleared as well
`;
