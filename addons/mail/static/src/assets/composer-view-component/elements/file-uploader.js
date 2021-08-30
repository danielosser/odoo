/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            fileUploader
        [Element/model]
            ComposerViewComponent
        [Field/target]
            FileUploaderComponent
        [Element/props]
            [FileUploaderComponent/composerView]
                @record
                .{ComposerViewComponent/composerView}
            [FileUploaderComponent/thread]
                @record
                .{ComposerViewComponent/composerView}
                .{ComposerView/composer}
                .{Composer/activeThread}
`;
