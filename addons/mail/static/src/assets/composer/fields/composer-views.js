/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            composerViews
        [Field/model]
            Composer
        [Field/type]
            o2m
        [Field/target]
            ComposerView
        [Field/isCausal]
            true
        [Field/inverse]
            ComposerView/composer
`;
