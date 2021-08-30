/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the channel to redirect to once the user clicks on the
        'joinButton'.
    {Field}
        [Field/name]
            channel
        [Field/model]
            WelcomeView
        [Field/type]
            o2o
        [Field/target]
            Thread
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;
