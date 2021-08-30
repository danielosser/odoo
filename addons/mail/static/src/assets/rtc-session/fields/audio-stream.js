/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            audioStream
        [Field/model]
            RtcSession
        [Field/type]
            attr
        [Field/target]
            MediaStream
`;
