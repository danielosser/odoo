/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether to show the message delete-confirm dialog
    {Field}
        [Field/name]
            showDeleteConfirm
        [Field/model]
            MessageActionList
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
