/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            UserSetting/pushToTalkKeyFormat
        [Action/params]
            record
                [type]
                    UserSetting
        [Action/returns]
            Object
        [Action/behavior]
            {if}
                @record
                .{UserSetting/pushToTalkKey}
                .{isFalsy}
            .{then}
                {break}
            :res
                @record
                .{UserSetting/pushToTalkKey}
                .{String/split}
                    .
            {Record/insert}
                [Record/traits]
                    Dict
                [shiftKey]
                    @res
                    .{Dict/get}
                        shiftKey
                    .{isTruthy}
                [ctrlKey]
                    @res
                    .{Dict/get}
                        ctrlKey
                    .{isTruthy}
                [altKey]
                    @res
                    .{Dict/get}
                        altKey
                    .{isTruthy}
                [key]
                    @res
                    .{Dict/get}
                        key
                    .{|}
                        false
`;
