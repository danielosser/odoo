/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separatorLineNewMessages
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            hr
        [Model/traits]
            MessageListComponent/separatorLine
        [web.Element/style]
            [web.scss/border-color]
                {scss/lighten}
                    {scss/$o-brand-odoo}
                    15%
`;
