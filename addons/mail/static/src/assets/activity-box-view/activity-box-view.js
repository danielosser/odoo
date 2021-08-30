/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ActivityBoxView
        [Model/fields]
            chatter
            isActivityListVisible
        [Model/id]
            ActivityBoxView/chatter
`;
