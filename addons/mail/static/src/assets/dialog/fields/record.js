/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Content of dialog that is directly linked to a record that models
        a UI component, such as AttachmentViewer. These records must be
        created from @see 'DialogManager/open'.
    {Field}
        [Field/name]
            manager
        [Field/model]
            Dialog
        [Field/type]
            o2o
        [Field/target]
            Record
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/isCausal]
            true
        [Field/compute]
            {if}
                @record
                .{Dialog/attachmentViewer}
            .{then}
                @record
                .{Dialog/attachmentViewer}
            .{elif}
                @record
                .{Dialog/followerSubtypeList}
            .{then}
                @record
                .{Dialog/followerSubtypeList}
`;
