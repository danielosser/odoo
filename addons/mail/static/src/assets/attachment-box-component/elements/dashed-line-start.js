/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            dashedLineStart
        [Element/model]
            AttachmentBoxComponent
        [web.Element/tag]
            hr
        [Model/traits]
            AttachmentBoxComponent/dashedLine
`;
