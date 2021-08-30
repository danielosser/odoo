/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonSendIcon
        [Element/model]
            ComposerViewComponent
        [Element/isPresent]
            {Device/isMobile}
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-paper-plane-o
`;
