/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Discuss/clearIsAddingItem
        [Action/params]
            discuss
        [Action/behavior]
            {Record/update}
                [0]
                    @discuss
                [1]
                    [Discuss/addingChannelValue]
                        {Record/empty}
                    [Discuss/isAddingChannel]
                        false
                    [Discuss/isAddingChat]
                        false
`;
