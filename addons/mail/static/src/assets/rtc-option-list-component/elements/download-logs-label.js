/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            downloadLogsLabel
        [Element/model]
            RtcOptionListComponent
        [Model/traits]
            RtcOptionListComponent/label
        [web.Element/textContent]
            {Locale/text}
                Download logs
`;
