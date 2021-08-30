/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            tabs
        [Field/model]
            MobileMessagingNavbarComponent
        [Field/type]
            attr
        [Field/target]
            Array
            {Dev/comment}
                element: {
                    type: Object,
                    shape: {
                        icon: {
                            type: String,
                            optional: true,
                        },
                        id: String,
                        label: String,
                    },
                },
`;
