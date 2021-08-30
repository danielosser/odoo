/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ThreadTypingIconComponent
        [Model/fields]
            animation
            size
            title
        [Model/template]
            root
                dot1
                separator1
                dot2
                separator2
                dot3
`;
