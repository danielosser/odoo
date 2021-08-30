/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Context}
        [Context/name]
            activity
        [Context/model]
            ActivityBoxComponent
        [Model/fields]
            activity
        [Model/template]
            activityContext
                activity
`;
