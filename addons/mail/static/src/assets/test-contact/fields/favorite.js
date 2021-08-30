/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            favorite
        [Field/model]
            TestContact
        [Field/type]
            o2o
        [Field/target]
            TestHobby
        [Field/default]
            {Record/insert}
                [Record/traits]
                    TestHobby
                [TestHobby/description]
                    football
`;
