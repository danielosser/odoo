/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Small override that asks for confirmation in case there is a meeting linked
        to this activity.
    {ElementAddon}
        [ElementAddon/feature]
            calendar
        [ElementAddon/field]
            ActivityComponent/cancelButton
        [ElementAddon/model]
            ActivityComponent
        [ElementAddon/onClick]
            {if}
                @record
                .{ActivityComponent/activity}
                .{Activity/calendarEventId}
                .{isFalsy}
            .{then}
                @original
            .{else}
                {Dialog/confirm}
                    [0]
                        {Locale/text}
                            The activity is linked to a meeting. Deleting it will remove the meeting as well. Do you want to proceed?
                    [onConfirm]
                        @original
`;
