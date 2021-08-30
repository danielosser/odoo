/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            PopoverView
        [Field/type]
            m2o
        [Field/target]
            Device
        [Field/observe]
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [event]
                    click
                [callback]
                    {PopoverView/_onClickCaptureGlobal}
                        [0]
                            @record
                        [1]
                            @ev
`;
