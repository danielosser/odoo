/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            TestContact
        [Model/fields]
            address
            favorite
            hobbies
            id
            tasks
        [Model/id]
            TestContact/id
`;
