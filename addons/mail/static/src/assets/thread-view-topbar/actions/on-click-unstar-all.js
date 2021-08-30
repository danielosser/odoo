/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadViewTopbar/onClickUnstarAll
        [Action/behavior]
            {Message/unstarAll}
`;