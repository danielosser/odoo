/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsCreationDatetime
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            :momentCreateDate
                {Record/insert}
                    [Record/traits]
                        web.Moment
                    {String/autoToDate}
                        @record
                        .{ActivityComponent/activity}
                        .{Activity/dateCreate}
            :datetimeFormat
                {Locale/getLangDatetimeFormat}
            {web.Moment/format}
                @momentCreateDate
                @datetimeFormat
`;
