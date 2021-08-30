/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            SoundEffect
        [Model/fields]
            audio
            filename
            path
        [Model/id]
            SoundEffect/path
            .{&}
                SoundEffect/filename
        [Model/actions]
            SoundEffect/play
            SoundEffect/stop
`;
