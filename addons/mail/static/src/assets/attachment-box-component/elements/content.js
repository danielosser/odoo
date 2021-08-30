/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            content
        [Element/model]
            AttachmentBoxComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex-direction]
                column
`;
