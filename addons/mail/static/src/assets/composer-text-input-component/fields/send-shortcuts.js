/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Keyboard shortcuts from text input to send message.
    {Field}
        [Field/name]
            sendShortcuts
        [Field/model]
            ComposerTextInputComponent
        [Field/type]
            attr
        [Field/target]
            Array
            {Dev/comment}
                element: String
        [Field/validate]
            {foreach}
                @field
            .{as}
                shortcut
            .{do}
                {if}
                    {Record/insert}
                        [Record/traits]
                            Collection
                        ctrl-enter
                        enter
                        meta-enter
                    .{Collection/includes}
                        @shortcut
                    .{isFalsy}
                .{then}
                    false
                    {break}
            true
`;
