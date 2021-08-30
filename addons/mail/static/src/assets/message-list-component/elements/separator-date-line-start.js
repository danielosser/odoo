/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separatorDateLineStart
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            hr
        [Model/traits]
            MessageListComponent/separatorLine
`;
