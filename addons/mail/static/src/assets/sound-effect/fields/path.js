/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Path to the audio file.
    {Field}
        [Field/name]
            path
        [Field/model]
            SoundEffect
        [Field/type]
            attr
        [Field/target]
            String
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/default]
            /mail/static/src/audio/
`;
