/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ComposerView/_generateMentionsLinks
        [Action/params]
            record
                [type]
                    ComposerView
            content
                [type]
                    String
        [Action/returns]
            ChannelCommand
        [Action/behavior]
            {if}
                @content
                .{String/startsWith}
                    /
            .{then}
                :firstWord
                    @content
                    .{String/substring}
                        1
                    .{String/split}
                        /\s/
                    .{Collection/first}
                {Env/commands}
                .{Collection/find}
                    {func}
                        [in]
                            command
                        [out]
                            {if}
                                @command
                                .{ChannelCommand/name}
                                .{!=}
                                    @firstWord
                            .{then}
                                false
                            .{elif}
                                @command
                                .{ChannelCommand/channelTypes}
                            .{then}
                                @command
                                .{ChannelCommand/channelTypes}
                                .{Collection/includes}
                                    @record
                                    .{ComposerView/composer}
                                    .{Composer/thread}
                                    .{Thread/channelType)
                            .{else}
                                true
`;