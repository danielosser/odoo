/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            companyName
        [Element/model]
            WelcomeViewComponent
        [web.Element/tag]
            h2
        [web.Element/class]
            m-5
        [web.Element/textContent]
            {Env/companyName}
`;
