/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonAddLabel
        [Element/model]
            AttachmentBoxComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Add attachments
`;
