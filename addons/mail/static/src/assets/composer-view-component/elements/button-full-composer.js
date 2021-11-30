/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonFullComposer
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
            fa-expand
        [web.Element/title]
            {Locale/text}
                Full composer
        [web.Element/type]
            button
        [Element/onClick]
            {ComposerView/openFullComposer}
                @record
                .{ComposerViewComponent/composerView}
`;
