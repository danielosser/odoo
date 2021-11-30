/** @odoo-module **/

import { Define } from '@mail/define';

import { str_to_date } from 'web.time';

export default Define`
    {Dev/comment}
        Text shown when partner is out of office.
    {Field}
        [Field/name]
            outOfOfficeText
        [Field/feature]
            hr_holidays
        [Field/model]
            Partner
        [Field/type]
            attr
        [Field/target]
            String
        [Field/compute]
            {if}
                @record
                .{Partner/outOfOfficeDateEnd}
                .{isFalsy}
            .{then}
                {Record/empty}
                {break}
            {if}
                {Locale/language}
                .{isFalsy}
            .{then}
                {Record/empty}
                {break}
            :currentDate
                {Record/insert}
                    [Record/traits]
                        Date
            :date
                {String/toDate}
                    @record
                    .{Partner/outOfOfficeDateEnd}
            :options
                {Record/insert}
                    [Record/traits]
                        Object
                    [day]
                        numeric
                    [month]
                        short
            {if}
                @currentDate
                .{Date/fullYear}
                .{!=}
                    @date
                    .{Date/fullYear}
            .{then}
                {Record/update}
                    [0]
                        @options
                    [1]
                        [year]
                            numeric
            {String/sprintf}
                [0]
                    {Locale/text}
                        Out of office until %s
                [1]
                    {Date/toLocaleDateString}
                        [0]
                            @date
                        [1]
                            {Locale/language}
                            .{String/replace}
                                /_/g
                                -
                        [2]
                            @options
`;
