/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageActionList/onReactionPopoverOpened
        [Action/params]
            ev
                [type]
                    CustomEvent
            record
                [type]
                    MessageActionList
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                [1]
                    [MessageActionList/isReactionPopoverOpened]
                        true
`;
