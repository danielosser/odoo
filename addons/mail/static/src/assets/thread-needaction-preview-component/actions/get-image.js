/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Get the image route of the thread.
    {Action}
        [Action/name]
            ThreadNeedactionPreviewComponent/getImage
        [Action/params]
            record
                [type]
                    ThreadNeedactionPreviewComponent
        [Action/returns]
            String
        [Action/behavior]
            {if}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/moduleIcon}
            .{then}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/moduleIcon}
            .{elif}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/correspondent}
            .{then}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/correspondent}
                .{Partner/avatarUrl}
            .{elif}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/model}
                .{=}
                    mail.channel
            .{then}
                /web/image/mail.channel/
                .{+}
                    @record
                    .{ThreadNeedactionPreviewComponent/thread}
                    .{Thread/id}
                .{+}
                    /avatar_128?unique=
                .{+}
                    @record
                    .{ThreadNeedactionPreviewComponent/thread}
                    .{Thread/avatarCacheKey}
            .{else}
                /mail/static/src/img/smiley/avatar.jpg
`;
