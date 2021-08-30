/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Save the scroll positions of the chat window in the store.
        This is useful in order to remount chat windows and keep previous
        scroll positions. This is necessary because when toggling on/off
        home menu, the chat windows have to be remade from scratch.
    {Action}
        [Action/name]
            ChatWindowComponent/_onWillShowHomeMenu
        [Action/params]
            record
        [Action/behavior]
            {ChatWindowComponent/_saveThreadScrollTop}
                @record
`;
