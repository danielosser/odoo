/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            descriptionTermDueOn
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            dt
        [web.Element/textContent]
            {Locale/text}
                Due on
`;
