/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleText
        [Element/model]
            AttachmentBoxComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Attachments
        [web.Element/style]
            [web.scss/padding]
                {scss/map-get}
                    {scss/$spacers}
                    3
`;
