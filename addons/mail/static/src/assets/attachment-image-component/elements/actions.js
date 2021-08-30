/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actions
        [Element/model]
            AttachmentImageComponent
        [web.Element/class]
            d-flex
            flex-column
        [web.Element/style]
            [web.scss/justify-content]
                space-between
`;
