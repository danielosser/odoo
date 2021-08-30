/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            ChatWindowHiddenMenuComponent
        [Lifecycle/behavior]
            {ChatWindowHiddenMenuComponent/_apply}
                @record
`;
