/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onCreate
        [Lifecycle/model]
            ThreadViewTopbar
        [Lifecycle/behavior]
            {Device/addEventListener}
                [0]
                    click
                [1]
                    {func}
                        [in]
                            ev
                        [out]
                            {ThreadViewTopbar/_onClickCaptureGlobal}
                                @record
                                @ev
                                true
                [2]
                    true
`;
