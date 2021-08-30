/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            RtcConfigurationMenu
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
                    {RtcConfigurationMenu/_onKeydown}
                        @record
                        @ev
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [FieldObserver/event]
                    keydown
                [FieldObserver/callback]
                    {RtcConfigurationMenu/_onKeyup}
                        @record
                        @ev
`;
