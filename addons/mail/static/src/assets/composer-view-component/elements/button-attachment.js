/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonAttachment
        [Element/model]
            ComposerViewComponent
        [web.Element/tag]
            button
        [Model/traits]
            ComposerViewComponent/button
            ComposerViewComponent/toolButton
        [web.Element/class]
            btn
            btn-light
            fa
            fa-paperclip
        [web.Element/title]
            {Locale/text}
                Add attachment
        [web.Element/type]
            button
        [Element/onClick]
            {ComposerViewComponent/openBrowserFileUploader}
                @record
                .{ComposerViewComponent/fileUploader}
            {if}
                {Device/isMobileDevice}
            .{then}
                {Record/update}
                    [0]
                        @record
                        .{ComposerViewComposer/composerView}
                    [1]
                        [ComposerView/doFocus]
                            true
`;
