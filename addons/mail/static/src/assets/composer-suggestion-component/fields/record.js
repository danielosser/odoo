/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            record
        [Field/model]
            ComposerSuggestionComponent
        [Field/type]
            m2o
        [Field/isRequired]
            true
`;
