/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            attachmentList
        [Element/model]
            ComposerViewComponent
        [Field/target]
            AttachmentListComponent
        [Element/isPresent]
            @record
            .{ComposerViewComponent/composerView}
            .{ComposerView/composer}
            .{Composer/attachments}
            .{Collection/length}
            .{>}
                0
        [Element/props]
            [AttachmentListComponent/attachmentList]
                @record
                .{ComposerViewComponent/composerView}
                .{ComposerView/attachmentList}
        [web.Element/style]
            [web.scss/flex]
                1
                1
                auto
            {if}
                @record
                .{ComposerViewComponent/isCompact}
            .{then}
                [web.scss/max-height]
                    100
                    px
            {if}
                record
                .{ComposerViewComponent/isCompact}
                .{isFalsy}
            .{then}
                [web.scss/overflow-y]
                    auto
                [web.scss/max-height]
                    300
                    px
`;
