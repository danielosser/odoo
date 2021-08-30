/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            title
        [Element/model]
            AttachmentBoxComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/align-items]
                center
            [web.scss/font-weight]
                bold
`;
