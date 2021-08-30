/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageActionList/onEmojiSelection
        [Action/params]
            ev
                [type]
                    web.CustomEvent
                [description]
                    @param {Object} ev.detail
                    @param {string} ev.detail.unicode
            record
                [type]
                    MessageActionList
        [Action/behavior]
            {Message/addReaction}
                [0]
                    @record
                    .{MessageActionList/message}
                [1]
                    @ev
                    .{web.CustomEvent/detail}
                    .{web.Detail/unicode}
`;
