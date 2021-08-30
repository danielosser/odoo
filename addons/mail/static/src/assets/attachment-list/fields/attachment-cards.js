/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the attachment cards that are displaying this nonImageAttachments.
    {Field}
        [Field/name]
            attachmentCards
        [Field/model]
            AttachmentList
        [Field/type]
            o2m
        [Field/target]
            AttachmentCard
        [Field/isCausal]
            true
        [Field/inverse]
            AttachmentCard/attachmentList
        [Field/compute]
            @record
            .{AttachmentList/nonImageAttachments}
            .{Collection/map}
                {func}
                    [in]
                        item
                    [out]
                        {Record/insert}
                            [Record/traits]
                                AttachmentCard
                            [AttachmentCard/attachment]
                                @item
`;
