/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            AutocompleteInputComponent/_onAutocompleteFocus
        [Action/params]
            ev
            record
        [Action/behavior]
            {if}
                @record
                .{AutocompleteInputComponent/focus}
            .{then}
                {Dev/comment}
                    AKU TODO: change this...
                @record
                .{AutocompleteInputComponent/focus}
                    @ev
            .{else}
                {web.Event/preventDefault}
                    @ev
`;
