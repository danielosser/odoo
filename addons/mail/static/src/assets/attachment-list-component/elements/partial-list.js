/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            partialList
        [Element/model]
            AttachmentListComponent
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex]
                1
            [web.scss/flex-flow]
                wrap
`;
