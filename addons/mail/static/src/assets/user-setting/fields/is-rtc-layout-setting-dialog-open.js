/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        true if the dialog for the call viewer layout is open
    {Field}
        [Field/name]
            isRtcLayoutSettingDialogOpen
        [Field/model]
            UserSetting
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
