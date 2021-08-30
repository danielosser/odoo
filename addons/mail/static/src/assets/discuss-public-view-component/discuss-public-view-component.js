/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussPublicViewComponent
        [Model/fields]
            discussPublicView
        [Model/template]
            root
                threadView
                welcomeView
`;
