/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachment images that are displaying this imageAttachments.
    {Field}
        [Field/name]
            attachmentImages
        [Field/model]
            AttachmentList
        [Field/type]
            o2m
        [Field/target]
            AttachmentImage
        [Field/isCausal]
            true
        [FIeld/inverse]
            AttachmentImage/attachmentList
        [Field/compute]
            @record
            .{AttachmentList/imageAttachments}
            .{Collection/map}
                {func}
                    [in]
                        item
                    [out]
                        {Record/insert}
                            [Record/traits]
                                AttachmentImage
                            [AttachmentImage/attachment]
                                @item
`;
