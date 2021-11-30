/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsButtonIcon
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-info-circle
        [web.Element/role]
            img
        [web.Element/title]
            {Locale/text}
                Info
`;
