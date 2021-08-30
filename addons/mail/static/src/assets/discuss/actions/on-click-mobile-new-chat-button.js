/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Discuss/onClickMobileNewChatButton
        [Action/params]
            discuss
        [Action/behavior]
            {Record/update}
                [0]
                    @discuss
                [1]
                    [Discuss/isAddingChat]
                        true
`;
