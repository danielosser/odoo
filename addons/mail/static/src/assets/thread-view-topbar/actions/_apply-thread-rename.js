/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadViewTopbar/_applyThreadRename
        [Action/params]
            record
                [type]
                    ThreadViewTopbar
        [Action/behavior]
            :newName
                @record
                .{ThreadViewTopbar/pendingThreadName}
            {Record/update}
                [0]
                    @record
                [1]
                    [ThreadViewTopbar/isEditingThreadName]
                        false
                    [ThreadViewTopbar/pendingThreadName]
                        {Record/empty}
            {if}
                @record
                .{ThreadViewTopbar/thread}
                .{Thread/channeltype}
                .{=}
                    chat
                .{&}
                    @newName
                    .{!=}
                        @record
                        .{ThreadViewTopbar/thread}
                        .{Thread/customChannelName}
            .{then}
                {Thread/setCustomName}
                    [0]
                        @record
                        .{ThreadViewTopbar/thread}
                    [1]
                        @newName
            {if}
                @newName
                .{&}
                    @record
                    .{ThreadViewTopbar/thread}
                    .{Thread/channelType}
                    .{=}
                        channel
                .{&}
                    @newName
                    .{!=}
                        @record
                        .{ThreadViewTopbar/thread}
                        .{Thread/name}
            .{then}
                {Thread/rename}
                    [0]
                        @record
                        .{ThreadViewTopbar/thread}
                    [1]
                        @newName
            {if}
                @record
                .{ThreadViewTopbar/thread}
                .{Thread/channelType}
                .{=}
                    group
                .{&}
                    @newName
                    .{!=}
                        @record
                        .{ThreadViewTopbar/thread}
                        .{Thread/name}
            .{then}
                {Thread/rename}
                    [0]
                        @record
                        .{ThreadViewTopbar/thread}
                    [1]
                        @newName
`;