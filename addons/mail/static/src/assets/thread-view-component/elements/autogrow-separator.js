/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            autogrowSeparator
        [Element/model]
            ThreadViewComponent
        [Model/traits]
            AutogrowComponent
        [Element/isPresent]
            @record
            .{ThreadViewComponent/threadView}
            .{ThreadView/composerView}
`;
