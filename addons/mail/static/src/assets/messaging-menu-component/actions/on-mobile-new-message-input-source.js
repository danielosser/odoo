/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingMenuComponent/_onMobileNewMessageInputSource
        [Action/params]
            req
                [type]
                    Object
                [description]
                    @param {string} req.term
            res
                [type]
                    Function
        [Action/behavior]
            :value
                {String/escape}
                    @req
                    .{Dict/get}
                        term
            {Partner/imSearch}
                [callback]
                    {func}
                        [in]
                            partners
                        [out]
                            :suggestions
                                @partners
                                .{Collection/map}
                                    {func}
                                        [in]
                                            item
                                        [out]
                                            [id]
                                                @item
                                                .{Partner/id}
                                            [value]
                                                @item
                                                .{Partner/nameOrDisplayName}
                                            [label]
                                                @item
                                                .{Partner/nameOrDisplayName}
                            @res
                                {Collection/sortBy}
                                    [0]
                                        @suggestions
                                    [1]
                                        label
                [keyword]
                    @value
                [limit]
                    10
`;
