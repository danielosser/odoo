/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            discardButton
        [Element/model]
            ActivityMarkDonePopoverComponent
        [web.Element/tag]
            button
        [web.Element/type]
            button
        [web.Element/class]
            btn
            btn-sm
            btn-link
        [Element/onClick]
            {Component/trigger}
                @record
                o-popover-close
        [web.Element/textContent]
            {Locale/text}
                Discard
`;
