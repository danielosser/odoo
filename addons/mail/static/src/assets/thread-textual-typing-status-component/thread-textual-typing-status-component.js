/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ThreadTextualTypingStatusComponent
        [Model/fields]
            thread
        [Model/template]
            root
                icon
                separator
                text
`;
