/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Name of the audio file.
    {Field}
        [Field/name]
            filename
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
`;
