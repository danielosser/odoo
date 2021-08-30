/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            summary
        [Field/model]
            MessageReactionGroup
        [Field/type]
            attr
        [Field/target]
            String
        [Field/compute]
            :individualNames
                {Record/insert}
                    [Record/traits]
                        Collection
                    [0]
                        @record
                        .{MessageReactionGroup/partners}
                        .{Collection/map}
                            {func}
                                [in]
                                    item
                                [out]
                                    @item
                                    .{Partner/nameOrDisplayName}
                    [1]
                        @record
                        .{MessageReactionGroup/guests}
                        .{Collection/map}
                            {func}
                                [in]
                                    item
                                [out]
                                    @item
                                    .{Guest/name}
                .{Collection/flatten}
            {switch}
                @individualNames
                .{Collection/length}
            .{case}
                [1]
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                %s has reacted with %s
                        [1]
                            @invidualNames
                            .{Collection/first}
                        [2]
                            @record
                            .{MessageReactionGroup/content}
                [2]
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                %s and %s have reacted with %s
                        [1]
                            @invidualNames
                            .{Collection/first}
                        [2]
                            @invidualNames
                            .{Collection/second}
                        [3]
                            @record
                            .{MessageReactionGroup/content}
                [3]
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                %s, %s, %s have reacted with %s
                        [1]
                            @invidualNames
                            .{Collection/first}
                        [2]
                            @invidualNames
                            .{Collection/second}
                        [3]
                            @invidualNames
                            .{Collection/third}
                        [4]
                            @record
                            .{MessageReactionGroup/content}
                [4]
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                %s, %s, %s and 1 other person have reacted with %s
                        [1]
                            @invidualNames
                            .{Collection/first}
                        [2]
                            @invidualNames
                            .{Collection/second}
                        [3]
                            @invidualNames
                            .{Collection/third}
                        [4]
                            @record
                            .{MessageReactionGroup/content}
                []
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                %s, %s, %s and %s other persons have reacted with %s
                        [1]
                            @invidualNames
                            .{Collection/first}
                        [2]
                            @invidualNames
                            .{Collection/second}
                        [3]
                            @invidualNames
                            .{Collection/third}
                        [4]
                            @individualNames
                            .{Collection/length}
                            .{-}
                                3
                        [5]
                            @record
                            .{MessageReactionGroup/content}
`;
