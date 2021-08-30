/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            _timeoutIds
        [Field/model]
            UserSetting
        [Field/type]
            attr
        [Field/target]
            Dict
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Dict
`;
