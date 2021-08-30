/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            AttachmentListComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex-flow]
                column
            [web.scss/justify-content]
                flex-start
`;
