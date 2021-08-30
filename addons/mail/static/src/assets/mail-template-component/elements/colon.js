/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            colon
        [Element/model]
            MailTemplateComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                :
`;
