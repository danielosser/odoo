/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MessageActionListComponent
        [Model/fields]
            messageActionList
        [Model/template]
            root
                actionReaction
                actionStar
                actionReply
                actionMarkAsRead
                actionEdit
                actionDelete
                deleteMessageConfirmDialog
`;
