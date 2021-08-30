/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            RtcVideoComponent
        [Model/fields]
            rtcSession
        [Model/template]
            root
        [Model/lifecycles]
            onUpdate
`;
