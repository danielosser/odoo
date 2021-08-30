/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ComposerView/_generateEmojisOnHtml
        [Action/params]
            record
                [type]
                    ComposerView
            htmlString
                [type]
                    String
        [Action/returns]
            String
        [Action/behavior]
            {foreach}
                @emojis
            .{as}
                emoji
            .{do}
                {foreach}
                    @emoji
                    .{Emoji/source}
                .{as}
                    source
                .{do}
                    :escapedSource
                        @source
                        .{String/replace}
                            [0]
                                ${() => '/([.*+?=^!:${}()|[\]/\\])/g'}
                            [1]
                                ${() => '\\$1'}
                    :regexp
                        {Record/insert}
                            [Record/traits]
                                RegExp
                            [0]
                                ${() => '(\\s|^)('}
                                .{+}
                                    @escapedSource
                                .{+}
                                    ${() => ')(?=\\s|$)'}
                            [1]
                                g
                    :htmlString
                        @htmlString
                        .{String/replace}
                            [0]
                                @regexp
                            [1]
                                $1
                                .{+}
                                    @emoji
                                    .{Emoji/unicode}
            @htmlString
`;