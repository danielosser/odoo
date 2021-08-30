/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Thread/_sortMembers
        [Action/params]
            members
                [type]
                    Collection<Partner>
            thread
                [type]
                    Thread
        [Action/returns]
            Collection<Partner>
        [Action/behavior]
            @members
            .{Collection/sort}
                {func}
                    [in]
                        item1
                        item2
                    [out]
                        :cleanedName1
                            {Utils/cleanSearchTerm}
                                @item1
                                .{Partner/nameOrDisplayName}
                        :cleanedName2
                            {Utils/cleanSearchTerm}
                                @item2
                                .{Partner/nameOrDisplayName}
                        {if}
                            @cleanedName1
                            .{<}
                                @cleanedName2
                        .{then}
                            -1
                        .{elif}
                            @cleanedName1
                            .{>}
                                @cleanedName2
                        .{then}
                            1
                        .{else}
                            @item1
                            .{Partner/id}
                            .{-}
                                @item2
                                .{Partner/id}
`;
