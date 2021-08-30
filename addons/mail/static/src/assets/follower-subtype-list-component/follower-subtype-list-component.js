/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            FollowerSubtypeListComponent
        [Model/fields]
            record
        [Model/template]
            root
                content
                    header
                        title
                        closeButton
                    body
                        subtypes
                            subtype
                    footer
                        applyButton
                        cancelButton
`;
