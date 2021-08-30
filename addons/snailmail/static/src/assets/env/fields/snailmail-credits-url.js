/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            snailmailCreditsUrl
        [Field/feature]
            snailmail
        [Field/model]
            Env
        [Field/type]
            attr
        [Field/target]
            String
`;
