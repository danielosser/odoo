/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onWillUnmount
        [Lifecycle/model]
            AutocompleteInputComponent
        [Lifecycle/behavior]
            ${
                () => {
                    $(
                        Define`
                            @record
                            .{AutocompleteInputComponent/root}
                        `
                    )
                    .autocomplete('destroy');
                }
            }
`;
