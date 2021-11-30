/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            grantAccessButtonLabel
        [Element/feature]
            website_slides
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Grant Access
`;
