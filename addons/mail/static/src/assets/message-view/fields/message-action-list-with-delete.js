/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the message action list that is displaying this message view
        in its delete confirmation view.
    {Field}
        [Field/name]
            messageActionListWithDelete
        [Field/model]
            MessageView
        [Field/type]
            o2o
        [Field/target]
            MessageActionList
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            MessageActionList/messageViewForDelete
`;
