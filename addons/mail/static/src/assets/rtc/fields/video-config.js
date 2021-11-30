/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        MediaTrackConstraints for the user video track.
        Some browsers do not support all constraints, for example firefox
        does not support aspectRatio. Those constraints will be ignored
        unless specified as mandatory (see doc ConstrainDOMString).
    {Field}
        [Field/name]
            videoConfig
        [Field/model]
            Rtc
        [Field/type]
            attr
        [Field/target]
            MediaTrackConstraints
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Object
                [aspectRatio]
                    16
                    .{/}
                        9
                [frameRate]
                    [max]
                        30
`;
