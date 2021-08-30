/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            MessageListComponent
        [Lifecycle/behavior]
            {MessageListComponent/_checkMostRecentMessageIsVisible}
                @record
            {MessageListComponent/adjustFromComponentHints}
                @record
`;
