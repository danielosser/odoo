/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ActivityType
        [Model/fields]
            activities
            displayName
            id
        [Model/id]
            Activity/id
`;
