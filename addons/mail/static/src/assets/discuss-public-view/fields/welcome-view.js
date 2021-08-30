/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the welcome view linked to this discuss public view.
    {Field}
        [Field/name]
            welcomeView
        [Field/model]
            DiscussPublicView
        [Field/type]
            o2o
        [Field/target]
            WelcomeView
        [Field/isCausal]
            true
        [Field/inverse]
            WelcomeView/discussPublicView
`;
