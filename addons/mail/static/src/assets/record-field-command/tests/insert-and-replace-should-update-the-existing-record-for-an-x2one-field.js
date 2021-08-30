/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            insertAndReplace: should update the existing record for an x2one field
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
                            [TestAddress/addressInfo]
                                address 10
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
                            [TestAddress/addressInfo]
                                address 10 updated
                            [TestAddress/id]
                                10
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/address}
                    .{=}
                        @address10
                [2]
                    insertAndReplace: should not drop an existing record
            {Test/assert}
                [0]
                    @record
                [1]
                    @address10
                    .{TestAddress/addressInfo}
                    .{=}
                        address 10 updated
                [2]
                    insertAndReplace: should update the existing record for a x2one field
`;
