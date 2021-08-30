/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            welcomeView
        [Field/model]
            WelcomeViewComponent
        [Field/type]
            m2o
        [Field/target]
            WelcomeView
        [Field/isRequired]
            true
`;
