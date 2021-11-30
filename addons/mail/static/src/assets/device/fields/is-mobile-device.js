/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States whether this device is an actual mobile device.
    {Field}
        [Field/name]
            isMobileDevice
        [Field/model]
            Device
        [Field/type]
            attr
        [Field/target]
            Boolean
`;
