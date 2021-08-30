/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Load previews of given thread. Basically consists of fetching all missing
        last messages of each thread.
    {Action}
        [Action/name]
            NotificationListComponent/_getThreads
        [Action/params]
            [record]
                NotificationListComponent
        [Action/behavior]
            {if}
                @record
                .{NotificationListComponent/filter}
                .{=}
                    mailbox
            .{then}
                {Record/all}
                    [Record/traits]
                        Thread
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Thread/isPinned}
                            .{&}
                                @item
                                .{Thread/model}
                                .{=}
                                    mail.box
                .{Collection/sort}
                    {func}
                        [in]
                            item1
                            item2
                        [out]
                            {if}
                                @item1
                                .{=}
                                    {Env/inbox}
                            .{then}
                                -1
                            .{elif}
                                @item2
                                .{=}
                                    {Env/inbox}
                            .{then}
                                1
                            .{elif}
                                @item1
                                .{=}
                                    {Env/starred}
                            .{then}
                                -1
                            .{elif}
                                @item2
                                .{=}
                                    {Env/starred}
                            .{then}
                                1
                            .{else}
                                {if}
                                    @item1
                                    .{Thread/displayName}
                                    .{<}
                                        @item2
                                        .{Thread/displayName}
                                .{then}
                                    -1
                                .{else}
                                    1
            .{elif}
                @record
                .{NotificationListComponent/filter}
                .{=}
                    channel
            .{then}
                {Record/all}
                    [Record/traits]
                        Thread
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Thread/channelType}
                            .{=}
                                channel
                            .{&}
                                @item
                                .{Thread/isPinned}
                            .{&}
                                @item
                                .{Thread/model}
                                .{=}
                                    mail.channel
                .{Collection/sort}
                    {func}
                        [in]
                            item1
                            item2
                        [out]
                            {if}
                                @item1
                                .{Thread/displayName}
                                .{<}
                                    @item2
                                    .{Thread/displayName}
                            .{then}
                                -1
                            .{else}
                                1
            .{elif}
                @record
                .{NotificationListComponent/filter}
                .{=}
                    chat
            .{then}
                {Thread/all}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Thread/isChatChannel}
                            .{&}
                                @item
                                .{Thread/isPinned}
                            .{&}
                                @item
                                .{Thread/model}
                                .{=}
                                    mail.channel
                .{Collection/sort}
                    {func}
                        [in]
                            item1
                            item2
                        [out]
                            {if}
                                @item1
                                .{Thread/displayName}
                                .{<}
                                    @item2
                                    .{Thread/displayName}
                            .{then}
                                -1
                            .{else}
                                1
            .{elif}
                @record
                .{NotificationListComponent/filter}
                .{=}
                    all
            .{then}
                {Dev/comment}
                    "All" filter is for channels and chats
                {Thread/all}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Thread/isPinned}
                            .{&}
                                @item
                                .{Thread/model}
                                .{=}
                                    mail.channel
                .{Collection/sort}
                    {func}
                        [in]
                            item1
                            item2
                        [out]
                            {if}
                                @item1
                                .{Thread/displayName}
                                .{<}
                                    @item2
                                    .{Thread/displayName}
                            .{then}
                                -1
                            .{else}
                                1
            .{else}
                {Error/throw}
                    Unsupported filter 
                    .{+}
                        @record
                        .{NotificationListComponent/filter}
`;
