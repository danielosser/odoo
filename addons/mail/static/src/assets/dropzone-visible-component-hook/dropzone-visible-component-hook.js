/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DropzoneVisibleComponentHook
        [Model/fields]
            device
            dragCount
            value
`;
