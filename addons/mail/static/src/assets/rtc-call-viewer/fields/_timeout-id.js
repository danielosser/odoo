/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            _timeoutId
        [Field/model]
            RtcCallViewer
        [Field/type]
            attr
        [Field/target]
            Integer
        [Field/default]
            undefined
`;
