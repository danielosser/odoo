/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            AutocompleteInputComponent/doFocus
        [Action/params]
            node
            record
        [Action/behavior]
            {UI/focus}
                @record
                .{AutocompleteInputComponent/root}
`;
