/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            threadTextualTypingStatus
        [Element/model]
            ComposerViewComponent
        [Field/target]
            ThreadTextualTypingStatusComponent
        [web.Element/class]
            text-truncate
        [Element/isPresent]
            @record
            .{ComposerViewComponent/hasThreadTyping}
        [Element/props]
            [ThreadTextualTypingStatusComponent/thread]
                @record
                .{ComposerViewComponent/composerView}
                .{ComposerView/composer}
                .{Composer/activeThread}
        [web.Element/style]
            [web.scss/font-size]
                {scss/$font-size-sm}
            {web.scss/selector}
                [0]
                    &:before
                [1]
                    {Dev/comment}
                        invisible character so that typing status bar has constant height, regardless of text content.
                    [web.scss/content]
                        "${/*() => '\200b'*/''}"
                        {Dev/comment}
                            unicode zero width space character
`;
