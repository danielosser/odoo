/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            details
        [Element/model]
            ActivityComponent
        [Element/isPresent]
            @record
            .{ActivityComponent/areDetailsVisible}
        [web.Element/style]
            [web.scss/color]
                {scss/gray}
                    500
`;
