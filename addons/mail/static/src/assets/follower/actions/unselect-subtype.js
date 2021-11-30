/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Follower/unselectSubtype
        [Action/params]
            follower
                [type]
                    Follower
            subtype
                [type]
                    FollowerSubtype
        [Action/behavior]
            {if}
                @follower
                .{Follower/selectedSubtypes}
                .{Collection/includes}
                    @subtype
            .{then}
                {Record/update}
                    [0]
                        @follower
                    [1]
                        [Follower/selectedSubtypes]
                            {Field/remove}
                                @subtype
`;
