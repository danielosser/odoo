/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            popoverView
        [Field/model]
            PopoverViewComponent
        [Field/type]
            m2o
        [Field/target]
            PopoverView
        [Field/inverse]
            PopoverView/component
`;
