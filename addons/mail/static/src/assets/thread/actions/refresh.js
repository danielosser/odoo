/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Thread/refresh
        [Action/params]
            thread
                [type]
                    Thread
        [Action/behavior]
            {if}
                @thread
                .{Thread/isTemporary}
            .{then}
                {break}
            {Thread/loadNewMessages}
                @thread
            {Record/update}
                [0]
                    @thread
                [1]
                    [Thread/isLoadingAttachments]
                        true
            {Record/doAsync}
                [0]
                    @thread
                [1]
                    {func}
                        {Thread/fetchAttachments}
                            @thread
            {Record/update}
                [0]
                    @thread
                [1]
                    [Thread/isLoadingAttachments]
                        false
`;
