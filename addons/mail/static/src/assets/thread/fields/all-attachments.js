/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            allAttachments
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Attachment
        [Field/compute]
            @record
            .{Thread/originThreadAttachments}
            .{Collection/concat}
                @record
                .{Thread/attachments}
            .{Collection/unique}
            .{Collection/sort}
                {func}
                    [in]
                        item1
                        item2
                    [out]
                        {Dev/comment}
                            "uploading" before "uploaded" attachments.
                        {if}
                            @item1
                            .{Attachment/isUploading}
                            .{isFalsy}
                            .{&}
                                @item2
                                .{Attachment/isUploading}
                        .{then}
                            1
                        .{elif}
                            @item1
                            .{Attachment/isUploading}
                            .{&}
                                @item2
                                .{Attachment/isUploading}
                                .{isFalsy}
                        .{then}
                            -1
                        .{else}
                            {Dev/comment}
                                "most-recent" before "oldest" attachments.
                            {Math/abs}
                                @item2
                                .{Attachment/id}
                            .{-}
                                {Math/abs}
                                    @item1
                                    .{Attachment/id}
`;
