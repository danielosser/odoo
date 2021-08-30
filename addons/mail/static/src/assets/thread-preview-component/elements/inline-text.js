/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inlineText
        [Element/model]
            ThreadPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            ThreadPreviewComponent/coreItem
            NotificationListItemComponent/inlineText
        [web.Element/style]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/lastMessage}
                .{isFalsy}
                .{|}
                    {Utils/htmlToTextContentInline}
                        @record
                        .{ThreadPreviewComponent/thread}
                        .{Thread/lastMessage}
                        .{Message/prettyBody}
                    .{String/length}
                    .{=}
                        0
            .{then}
                {web.scss/selector}
                    [0]
                        &::before
                    [1]
                        {Dev/comment}
                            AKU TODO: FIXME
                        [web.scss/content]
                            ${/*() => '\00a0'*/''}
                            {Dev/comment}
                                keep line-height as if it had content
`;
