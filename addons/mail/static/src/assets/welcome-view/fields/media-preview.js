/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the media preview embedded in this welcome view.
    {Field}
        [Field/name]
            mediaPreview
        [Field/model]
            WelcomeView
        [Field/type]
            o2o
        [Field/target]
            MediaPreview
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/compute]
            {if}
                @record
                .{WelcomeView/channel}
                .{&}
                    @record
                    .{WelcomeView/channel}
                    .{Thread/defaultDisplayMode}
                    .{=}
                        video_full_screen
            .{then}
                {Record/insert}
                    [Record/traits]
                        MediaPreview
            .{else}
                {Record/empty}
`;
