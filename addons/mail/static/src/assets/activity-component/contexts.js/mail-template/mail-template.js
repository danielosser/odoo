/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Context}
        [Context/name]
            mailTemplate
        [Context/model]
            ActivityComponent
        [Model/fields]
            mailTemplate
        [Model/template]
            mailTemplateForeach
                mailTemplate
`;
