/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            editButton
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            button
        [Model/traits]
            ActivityComponent/toolButton
        [web.Element/class]
            btn
            btn-link
        [Element/onClick]
            {Activity/edit}
                @record
                .{ActivityComponent/activity}
`;
