/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            online
        [Element/model]
            ThreadIconComponent
        [web.Element/style]
            [web.scss/color]
                {scss/$o-enterprise-primary-color}
`;
