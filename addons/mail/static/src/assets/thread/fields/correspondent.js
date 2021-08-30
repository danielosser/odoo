/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            correspondent
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            Partner
        [Field/compute]
            {if}
                @record
                .{Thread/channelType}
                .{=}
                    channel
            .{then}
                {Record/empty}
                {break}
            :correspondents
                @record
                .{Thread/members}
                .{Collection/filter}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{!=}
                                {Env/currentPartner}
            {if}
                @correspondents
                .{Collection/length}
                .{=}
                    1
            .{then}
                {Dev/comment}
                    2 members chat
                @correspondents
                .{Collection/first}
            .{elif}
                @record
                .{Thread/members}
                .{Collection/length}
                .{=}
                    1
            .{then}
                {Dev/comment}
                    chat with oneself
                @record
                .{Thread/members}
                .{Collection/first}
            .{else}
                {Record/empty}
`;
