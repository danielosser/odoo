/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            dialog
        [Element/model]
            DialogManagerComponent
        [Field/target]
            DialogComponent
        [Element/props]
            [DialogComponent/dialog]
                @template
                .{Template/dialog}
        [Element/t-foreach]
            {DialogManager/dialogs}
        [Element/t-as]
            dialog
        [Element/t-key]
            @template
            .{Template/dialog}
            .{Record/id}
`;
