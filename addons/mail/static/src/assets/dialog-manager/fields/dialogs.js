/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        FIXME: dependent on implementation that uses insert order in relations!!
    {Field}
        [Field/name]
            dialogs
        [Field/model]
            DialogManager
        [Field/type]
            o2m
        [Field/target]
            Dialog
        [Field/inverse]
            Dialog/manager
        [Field/isCausal]
            true
`;
