/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            coreHeader
        [Element/model]
            ComposerViewComponent
        [Element/isPresent]
            @record
            .{ComposerViewComponent/hasHeader}
        [web.Element/style]
            [web.scss/grid-area]
                core-header
`;
