/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            AutocompleteInputComponent/_onAutocompleteSelect
        [Action/params]
            ev
            record
            ui
        [Action/behavior]
            {if}
                @record
                .{AutocompleteInputComponent/select}
                    @ev
                    @ui
            .{then}
                {Dev/comment}
                    AKU TODO: change this...
                @record
                {AutocompleteInputComponent/select}
                    @ev
                    @ui
`;
