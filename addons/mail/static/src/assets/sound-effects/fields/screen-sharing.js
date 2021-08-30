/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            screenSharing
        [Field/model]
            SoundEffects
        [Field/type]
            o2o
        [Field/target]
            SoundEffect
        [Field/isCausal]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    SoundEffect
                [SoundEffect/filename]
                    share_02
`;
