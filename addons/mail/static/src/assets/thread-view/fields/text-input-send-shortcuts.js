/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the keyboard shortcuts that are available to send a message
        from the composer of this thread viewer.
    {Field}
        [Field/name]
            textInputSendShortcuts
        [Field/model]
            ThreadView
        [Field/type]
            attr
        [Field/compute]
            {if}
                @record
                .{ThreadView/thread}
                .{isFalsy}
            .{then}
                {break}
            {Dev/comment}
                Actually in mobile there is a send button,
                so we need there 'enter' to allow new line.
                Hence, we want to use a different shortcut
                'ctrl/meta enter' to send for small screen
                size with a channel. here send will be done
                on clicking the button or using the
                'ctrl/meta enter' shortcut.
            {if}
                {Device/isMobile}
                .{|}
                    {Discuss/threadView}
                    .{=}
                        @record
                    .{&}
                        {Discuss/thread}
                        .{=}
                            {Env/inbox}
            .{then}
                ctrl-enter
                meta-enter
            .{else}
                enter
`;
