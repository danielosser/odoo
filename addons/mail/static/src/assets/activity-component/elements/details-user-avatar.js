/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsAssignationUserAvatar
        [Element/model]
            ActivityComponent
        [web.Element/style]
            [web.scss/margin-inline-end]
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/object-fit]
                cover
            [web.scss/height]
                18
                px
            [web.scss/width]
                18
                px
            {scss/extend}
                .rounded-circle
`;
