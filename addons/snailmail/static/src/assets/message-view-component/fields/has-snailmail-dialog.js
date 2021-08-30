/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determine if the error dialog is displayed.
    {Field}
        [Field/name]
            hasSnailmailDialog
        [Field/feature]
            snailmail
        [Field/model]
            MessageViewComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
