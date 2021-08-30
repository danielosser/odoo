/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            title
        [Field/model]
            MessageSeenIndicator
        [Field/type]
            attr
        [Field/target]
            String
        [Field/compute]
            {if}
                @record
                .{MessageSeenIndicator/hasEveryoneSeen}
            .{then}
                {Locale/text}
                    Seen by Everyone
            .{elif}
                @record
                .{MessageSeenIndicator/hasSomeoneSeen}
            .{then}
                :partnersThatHaveSeen
                    @record
                    .{MessageSeenIndicator/partnersThatHaveSeen}
                    .{Collection/map}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Partner/name}
                {if}
                    @partnersThatHaveSeen
                    .{Collection/length}
                    .{=}
                        1
                .{then}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Seen by %s
                        [1]
                            @partnersThatHaveSeen
                            .{Collection/first}
                .{elif}
                    @partnersThatHaveSeen
                    .{Collection/length}
                    .{=}
                        2
                .{then}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Seen by %s and %s
                        [1]
                            @partnersThatHaveSeen
                            .{Collection/first}
                        [2]
                            @partnersThatHaveSeen
                            .{Collection/second}
                .{else}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Seen by %s, %s and more
                        [1]
                            @partnersThatHaveSeen
                            .{Collection/first}
                        [2]
                            @partnersThatHaveSeen
                            .{Collection/second}
            .{elif}
                @record
                .{MessageSeenIndicator/hasEveryoneFetched}
            .{then}
                {Locale/text}
                    Received by Everyone
            .{elif}
                @record
                .{MessageSeenIndicator/hasSomeoneFetched}
            .{then}
                :partnersThatHaveFetched
                    @record
                    .{MessageSeenIndicator/partnersThatHaveFetched}
                    .{Collection/map}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Partner/name}
                {if}
                    @partnersThatHaveFetched
                    .{Collection/length}
                    .{=}
                        1
                .{then}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Received by %s
                        [1]
                            @partnersThatHaveFetched
                            .{Collection/first}
                .{elif}
                    @partnersThatHaveFetched
                    .{Collection/length}
                    .{=}
                        2
                .{then}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Received by %s and %s
                        [1]
                            @partnersThatHaveFetched
                            .{Collection/first}
                        [2]
                            @partnersThatHaveFetched
                            .{Collection/second}
                .{else}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Received by %s, %s and more
                        [1]
                            @partnersThatHaveFetched
                            .{Collection/first}
                        [2]
                            @partnersThatHaveFetched
                            .{Collection/second}
            .{else}
                {Record/empty}
`;
