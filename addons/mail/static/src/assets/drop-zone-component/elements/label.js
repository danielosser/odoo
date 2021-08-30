/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            label
        [Element/model]
            DropZoneComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            {Locale/text}
                Drag Files Here
`;
