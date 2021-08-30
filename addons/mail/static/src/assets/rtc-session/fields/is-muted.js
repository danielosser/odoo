/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines if the user's microphone is in a muted state, which
        means that they cannot send sound regardless of the push to talk or
        voice activation (isTalking) state.
    {Field}
        [Field/name]
            isMuted
        [Field/model]
            RtcSession
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
