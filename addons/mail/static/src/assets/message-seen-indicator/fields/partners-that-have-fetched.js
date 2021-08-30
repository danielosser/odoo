/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            partnersThatHaveFetched
        [Field/model]
            MessageSeenIndicator
        [Field/type]
            m2m
        [Field/target]
            Partner
        [Field/compute]
            {Dev/comment}
                Manually called as not always called when necessary
                @see MessageSeenIndicator/computeFetchedValues
                @see MessageSeenIndicator/computeSeenValues
            {if}
                @record
                .{MessageSeenIndicator/message}
                .{isFalsy}
                .{|}
                    @record
                    .{MessageSeenIndicator/thread}
                    .{isFalsy}
                .{|}
                    @record
                    .{MessageSeenIndicator/thread}
                    .{Thread/partnerSeenInfos}
                    .{isFalsy}
            .{then}
                {Record/empty}
            .{else}
                :otherPartnersThatHaveFetched
                    @record
                    .{MessageSeenIndicator/thread}
                    .{Thread/partnerSeenInfos}
                    .{Collection/filter}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{ThreadPartnerSeenInfo/partner}
                                .{&}
                                    @item
                                    .{ThreadPartnerSeenInfo/partner}
                                    .{!=}
                                        @record
                                        .{MessageSeenIndicator/message}
                                        .{Message/author}
                                .{&}
                                    @item
                                    .{ThreadPartnerSeenInfo/lastFetchedMessage}
                                .{&}
                                    @item
                                    .{ThreadPartnerSeenInfo/lastFetchedMessage}
                                    .{Message/id}
                                    .{>=}
                                        @record
                                        .{MessageSeenIndicator/message}
                                        .{Message/id}
                    .{Collection/map}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{ThreadPartnerSeenInfo/partner}
                {if}
                    @otherPartnersThatHaveFetched
                    .{Collection/length}
                    .{=}
                        0
                .{then}
                    {Record/empty}
                .{else}
                    @otherPartnersThatHaveFetched
`;
