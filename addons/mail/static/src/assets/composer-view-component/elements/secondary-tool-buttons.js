/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            secondaryToolButtons
        [Element/model]
            ComposerViewComponent
        [Element/isPresent]
            @record
            .{ComposerViewComponent/isExpandable}
`;
