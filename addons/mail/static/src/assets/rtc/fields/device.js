/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            Rtc
        [Field/type]
            m2o
        [Field/target]
            Device
        [Field/default]
            {Env/device}
        [Field/observe]
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [FieldObserver/event]
                    keydown
                [FieldObserver/callback]
                    {Rtc/onKeydown}
                        @ev
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [FieldObserver/event]
                    keyup
                [FieldObserver/callback]
                    {Rtc/onKeyup}
                        @ev
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [FieldObserver/event]
                    beforeunload
                [FieldObserver/callback]
                    {if}
                        {Rtc/channel}
                    .{then}
                        {Thread/performRpcLeaveCall}
                            {Rtc/channel}
`;
