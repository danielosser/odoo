/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            dashedLine
        [Element/model]
            AttachmentBoxComponent
        [web.Element/style]
            [web.scss/flex-grow]
                1
            [web.scss/border-style]
                dashed
            [web.scss/border-color]
                {scss/gray}
                    300
`;
