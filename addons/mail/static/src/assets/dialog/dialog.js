/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            Dialog
        [Model/fields]
            attachmentViewer
            followerSubtypeList
            manager
            record
        [Model/id]
            Dialog/manager
            .{&}
                Dialog/attachmentViewer
                .{|}
                    Dialog/followerSubtypeList
`;
