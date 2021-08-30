/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageActionList/onDeleteConfirmDialogClosed
        [Action/params]
            ev
                [type]
                    CustomEvent
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                [1]
                    [MessageActionList/showDeleteConfirm]
                        false
`;
