/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inlineTextAfterPrefix
        [Element/model]
            ThreadPreviewComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/lastMessage}
            .{then}
                {Utils/htmlToTextContentInline}
                    @record
                    .{ThreadPreviewComponent/thread}
                    .{Thread/lastMessage}
                    .{Message/prettyBody}
`;
