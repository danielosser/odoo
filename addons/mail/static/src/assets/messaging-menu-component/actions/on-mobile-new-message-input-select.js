/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingMenuComponent/_onMobileNewMessageInputSelect
        [Action/params]
            ev
                [type]
                    Event
            ui
                [type]
                    Object
                [description]
                    @param {Object} ui.item
                    @param {integer} ui.item.id
        [Action/beahvior]
            {Env/openChat}
                [partnerId]
                    @ui
                    .{Dict/get}
                        item
                    .{Dict/get}
                        id
`;
