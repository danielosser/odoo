/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messagingNotInitializedIcon
        [Element/model]
            DiscussComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-circle-o-notch
            fa-spin
        [web.Element/style]
            [web.scss/margin-right]
                {scss/map-get}
                    {scss/$spacers}
                    1
`;
