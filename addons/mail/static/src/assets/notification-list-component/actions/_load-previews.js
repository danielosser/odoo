/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Load previews of given thread. Basically consists of fetching all missing
        last messages of each thread.
    {Action}
        [Action/name]
            NotificationListComponent/_loadPreviews
        [Action/params]
            record
                [type]
                    NotificationListComponent
        [Action/behavior]
            :threads
                @record
                .{NotificationListComponent/notifications}
                .{Collection/filter}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Notification/thread}
                            .{&}
                                {Record/get}
                                    @item
                                    .{Record/id}
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Notification/thread}
            {Thread/loadPreviews}
                @threads
`;
