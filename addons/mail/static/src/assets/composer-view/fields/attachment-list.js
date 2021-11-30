/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the attachment list that will be used to display the attachments.
    {Field}
        [Field/name]
            attachmentList
        [Field/model]
            ComposerView
        [Field/type]
            o2o
        [Field/target]
            AttachmentList
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            AttachmentList/composerView
        [Field/compute]
            {if}
                @record
                .{ComposerView/composer}
                .{&}
                    @record
                    .{ComposerView/composer}
                    .{Composer/attachments}
                    .{Collection/length}
                    .{>}
                        0
            .{then}
                {Record/insert}
                    [Record/traits]
                        AttachmentList
            .{else}
                {Record/empty}
`;