/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MessageActionList
        [Model/fields]
            hasMarkAsReadIcon
            hasReplyIcon
            isReactionPopoverOpened
            message
            messageView
            messageViewForDelete
            reactionPopoverRef
            showDeleteConfirm
        [Model/id]
            MessageActionList/messageView
        [Model/actions]
            MessageActionList/onClick
            MessageActionList/onClickConfirmDelete
            MessageActionList/onClickDelete
            MessageActionList/onClickEdit
            MessageActionList/onClickMarkAsRead
            MessageActionList/onClickReplyTo
            MessageActionList/onClickToggleStar
            MessageActionList/onDeleteConfirmDialogClosed
            MessageActionList/onEmojiSelection
            MessageActionList/onReactionPopoverClosed
            MessageActionList/onReactionPopoverOpened
`;
