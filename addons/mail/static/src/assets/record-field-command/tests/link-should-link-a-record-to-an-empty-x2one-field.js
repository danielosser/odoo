/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            link: should link a record to an empty x2one field
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
            :address
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        TestAddress
                    [TestAddress/id]
                        10
            @testEnv
            .{Record/update}
                [0]
                    @contact
                [1]
                    [TestContact/address]
                        @address
            {Test/assert}
                [0]
                    @record
                [1]
                    @contact
                    .{TestContact/address}
                    .{=}
                        @address
                [2]
                    link: should link a record to an empty x2one field
            {Test/assert}
                [0]
                    @record
                [1]
                    @address
                    .{TestAddress/contact}
                    .{=}
                        @contact
                [2]
                    the inverse relation should be set as well
`;
