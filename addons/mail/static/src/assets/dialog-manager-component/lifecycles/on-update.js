/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            DialogManagerComponent
        [Lifecycle/behavior]
            {DialogManagerComponent/_checkDialogOpen}
                @record
`;
