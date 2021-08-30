/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MobileMessagingNavbarComponent
        [Model/fields]
            activeTabId
            tabs
        [Model/template]
            root
                tab
                    tabIcon
                    tabLabel
`;
