/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Get the image route of the thread.
    {Action}
        [Action/name]
            ThreadPreviewComponent/getImage
        [Action/params]
            record
                [type]
                    ThreadPreviewComponent
        [Action/returns]
            String
        [Action/behavior]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/correspondent}
            .{then}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/correspondent}
                .{Partner/avatarUrl}
            .{else}
                /web/image/mail.channel/
                .{+}
                    @record
                    .{ThreadPreviewComponent/thread}
                    .{Thread/id}
                .{+}
                    /avatar_128?unique=
                .{+}
                    @record
                    .{ThreadPreviewComponent/thread}
                    .{Thread/avatarCacheKey}
`;
