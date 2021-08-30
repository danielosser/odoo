/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleTextLabel
        [Element/model]
            ActivityBoxComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Planned activities
`;
