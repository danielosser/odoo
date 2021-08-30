/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageActionList/onClickDelete
        [Action/params]
            ev
                [type]
                    MouseEvent
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                [1]
                    [MessageActionList/showDeleteConfirm]
                        true
`;
