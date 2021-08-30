/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States whether this attachment is editable.
    {Field}
        [Field/name]
            isEditable
        [Field/model]
            Attachment
        [Field/type]
            attr
        [Field/isRequired]
            Boolean
        [Field/compute]
            {if}
                @record
                .{Attachment/messages}
                .{Collection/length}
                .{>}
                    0
            .{then}
                @record
                .{Attachment/messages}
                .{Collection/some}
                    {func}
                        [in]
                            message
                        [out]
                            @message
                            .{Message/canBeDeleted}
                            .{|}
                                @message
                                .{Message/author}
                                .{&}
                                    @message
                                    .{Message/author}
                                    .{=}
                                        {Env/currentPartner}
                            .{|}
                                @message
                                .{Message/guestAuthor}
                                .{&}
                                    @message
                                    .{Message/guestAuthor}
                                    .{=}
                                        {Env/currentGuest}
            .{else}
                true
`;
