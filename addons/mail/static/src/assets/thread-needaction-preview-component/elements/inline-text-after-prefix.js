/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inlineTextAfterPrefix
        [Element/model]
            ThreadNeedactionPreviewComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {if}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/lastNeedactionMessageAsOriginThread}
            .{then}
                {Utils/htmlToTextContentInline}
                    @record
                    .{ThreadNeedactionPreviewComponent/thread}
                    .{Thread/lastNeedactionMessageAsOriginThread}
                    .{Message/prettyBody}
`;
