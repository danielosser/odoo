/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hobbies
        [Field/model]
            TestContact
        [Field/type]
            o2m
        [Field/target]
            TestHobby
        [Field/default]
            {Record/insert}
                []
                    [Record/traits]
                        TestHobby
                    [TestHobby/description]
                        hiking
                []
                    [Record/traits]
                        TestHobby
                    [TestHobby/description]
                        fishing
`;
