/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        true if the user wants to use push to talk (over voice activation)
    {Field}
        [Field/name]
            usePushToTalk
        [Field/model]
            UserSetting
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
