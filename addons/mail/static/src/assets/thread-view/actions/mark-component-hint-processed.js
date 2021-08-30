/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadView/markComponentHintProcessed
        [Action/params]
            threadView
                [type]
                    ThreadView
            hint
                [type]
                    Hint
        [Action/behavior]
            {Record/update}
                [0]
                    @threadView
                [1]
                    [ThreadView/componentHintList]
                        @threadView
                        .{ThreadView/componentHintList}
                        .{Collection/filter}
                            {func}
                                [in]
                                    item
                                [out]
                                    @item
                                    .{!=}
                                        @hint
            {Env/messagingBus}
            .{Bus/trigger}
                [0]
                    o-thread-view-hint-processed
                [1]
                    [hint]
                        @hint
                    [threadViewer]
                        @threadView
                        .{ThreadView/threadViewer}
`;
