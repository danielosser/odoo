/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actionButtonsNotCompact
        [Element/model]
            ComposerViewComponent
        [Model/traits]
            ComposerViewComponent/actionButtons
        [Element/isPresent]
            @record
            .{ComposerViewComponent/isCompact}
`;
