/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the views that are displaying this message.
    {Field}
        [Field/name]
            messageViews
        [Field/model]
            Message
        [Field/type]
            o2m
        [Field/target]
            MessageView
        [Field/isCausal]
            true
        [Field/inverse]
            MessageView/message
`;
