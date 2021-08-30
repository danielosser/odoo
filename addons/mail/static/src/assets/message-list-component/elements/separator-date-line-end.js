/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separatorDateLineEnd
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            hr
        [Model/traits]
            MessageListComponent/separatorLine
`;
