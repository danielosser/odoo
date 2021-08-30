/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DialogManagerComponent
        [Model/actions]
            DialogManagerComponent/_checkDialogOpen
        [Model/template]
            root
                dialog
        [Model/lifecycles]
            onUpdate
`;
