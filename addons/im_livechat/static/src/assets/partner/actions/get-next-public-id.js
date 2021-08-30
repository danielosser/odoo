/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Partner/getNextPublicId
        [Action/feature]
            im_livechat
        [Action/behavior]
            :nextPublicId
                -1
            {func}
                :id
                    @nextPublicId
                :nextPublicId
                    @nextPublicId
                    .{-}
                        1
                @id
`;
