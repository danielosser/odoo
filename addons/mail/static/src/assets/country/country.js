/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            Country
        [Model/fields]
            code
            flagUrl
            id
            name
        [Model/id]
            Country/id
`;
