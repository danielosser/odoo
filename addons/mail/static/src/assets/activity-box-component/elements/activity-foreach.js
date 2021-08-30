/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            activityForeach
        [Element/model]
            ActivityBoxComponent
        [Model/traits]
            Foreach
        [Foreach/collection]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
            .{Thread/activities}
        [Foreach/as]
            activity
        [Element/key]
            @field
            .{Foreach/get}
                activity
            .{Record/id}
        [Field/target]
            ActivityBoxComponent:activity
        [ActivityBoxComponent:activity/activity]
            @field
            .{Foreach/get}
                activity
`;
