/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ChatWindowManager/closeHiddenMenu
        [Action/params]
            chatWindowManager
        [Action/behavior]
            {func}
                {Record/update}
                    [0]
                        @chatWindowManager
                    [1]
                        [ChatWindowManager/isHiddenMenuOpen]
                            false
`;
