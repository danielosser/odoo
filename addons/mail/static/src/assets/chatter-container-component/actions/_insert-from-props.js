/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ChatterContainerComponent/_insertFromProps
        [Action/params]
            props
            record
        [Action/behavior]
            :values
                {Record/insert}
                    [Record/traits]
                        Chatter
                    @props
                    [Chatter/id]
                        @record
                        .{ChatterContainerComponent/_chatterId}
            {if}
                @values
                .{Chatter/threadId}
                .{=}
                    undefined
            .{then}
                {Record/update}
                    [0]
                        @values
                    [1]
                        [Chatter/threadId]
                            {Record/empty}
            {Record/update}
                [0]
                    @record
                [1]
                    [ChatterContainerComponent/chatter]
                        @values
            {Chatter/refresh}
                @record
                .{ChatterContainerComponent/chatter}
            {Component/render}
                @record
`;
