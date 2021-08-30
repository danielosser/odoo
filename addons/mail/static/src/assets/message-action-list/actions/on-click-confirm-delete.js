/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageActionList/onClickConfirmDelete
        [Action/params]
            ev
                [type]
                    MouseEvent
        [Action/behavior]
            {Message/updateContent}
                [0]
                    @record
                    .{MessageActionList/message}
                [1]
                    [attachment_ids]
                        {Record/insert}
                            [Record/traits]
                                Collection
                    [body]
                        {String/empty}
`;
