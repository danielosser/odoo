/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            fileUploader
        [Element/model]
            ActivityComponent
        [Field/target]
            FileUploaderComponent
        [Field/inverse]
            activityComponents
        [Element/props]
            [FileUploaderComponent/thread]
                @record
                .{ActivityComponent/activity}
                .{Activity/thread}
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/category}
            .{!=}
                upload_file
            .{&}
                @record
                .{ActivityComponent/activity}
                .{Activity/thread}
`;
