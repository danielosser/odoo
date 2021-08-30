/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            asideItemUnlink
        [Element/model]
            AttachmentCardComponent
        [Model/traits]
            AttachmentCardComponent/asideItem
        [Element/isPresent]
            @record
            .{AttachmentCardComponent/attachment}
            .{Attachment/isEditable}
        [web.Element/class]
            {if}
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachmentList}
                .{AttachmentList/composerView}
            .{then}
                position-absolute
        [web.Element/title]
            {Locale/text}
                Remove
        [Element/onClick]
            {AttachmentCard/onClickUnlink}
                [0]
                    @record
                    .{AttachmentCardComponent/attachmentCard}
                [1]
                    @ev
        [web.Element/style]
            {if}
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachmentList}
                .{AttachmentList/composerView}
            .{then}
                [web.scss/top]
                    0
                [web.scss/transform]
                    {web.scss/translateX}
                        100%
            [web.scss/cursor]
                pointer
            {if}
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachmentList}
                .{AttachmentList/composerView}
                .{isFalsy}
                .{&}
                    @field
                    .{web.Element/isHover}
            .{then}
                [web.scss/background-color]
                    {web.scss/gray}
                        400
            {if}
                @record
                .{AttachmentCardComponent/attachmentCard}
                .{AttachmentCard/attachmentList}
                .{AttachmentList/composerView}
            .{then}
                {if}
                    @record
                    .{AttachmentCardComponent/root}
                    .{web.Element/isHover}
                .{then}
                    [web.scss/transform]
                        {web.scss/translateX}
                            0
                [web.scss/color]
                    white
                [web.scss/background-color]
                    {web.scss/$o-brand-primary}
                [web.scss/transition]
                    [0]
                        transform
                    [1]
                        0.3s
                    [2]
                        ease
                    [3]
                        0s
                {if}
                    @field
                    .{web.Element/isHover}
                .{then}
                    [web.scss/background-color]
                        {scss/darken}
                            {scss/$o-brand-primary}
                            10%
`;
