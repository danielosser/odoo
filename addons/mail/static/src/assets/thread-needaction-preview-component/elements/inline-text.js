/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inlineText
        [Element/model]
            ThreadNeedactionPreviewComponent
        [web.Element/tag]
            span
        [Model/traits]
            ThreadNeedactionPreviewComponent/coreItem
            NotificationListItemComponent/inlineText
        [web.Element/style]
            {if}
                @record
                .{ThreadNeedactionPreviewComponent/inlineLastNeedactionMessageBody}
                .{Collection/length}
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
