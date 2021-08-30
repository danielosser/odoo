/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            composerView
        [Field/model]
            ComposerTextInputComponent
        [Field/type]
            m2o
        [Field/target]
            ComposerView
        [Field/isRequired]
            true
`;
