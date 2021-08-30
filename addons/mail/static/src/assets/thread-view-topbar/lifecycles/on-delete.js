/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onDelete
        [Lifecycle/model]
            ThreadViewTopbar
        [Lifecycle/behavior]
            {Device/removeEventListener}
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
                [2]
                    true
`;
