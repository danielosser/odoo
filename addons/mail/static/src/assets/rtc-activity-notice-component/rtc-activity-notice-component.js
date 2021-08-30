/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            RtcActivityNoticeComponent
        [Model/template]
            root
                rtcInvitations
                button
                    buttonContent
                        buttonTitle
                        outputIndicator
        [Model/action]
            RtcActivityNoticeComponent/_onClick
`;
