/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            _chatterId
        [Field/model]
            ChatterContainerComponent
        [Field/type]
            attr
        [Field/target]
            Integer
        [Field/default]
            {ChatterContainerComponent/getChatterNextTemporaryId}
`;
