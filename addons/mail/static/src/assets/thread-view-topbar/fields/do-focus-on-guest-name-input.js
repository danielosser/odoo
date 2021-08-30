/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether the guest name input needs to be focused.
    {Field}
        [Field/name]
            doFocusOnGuestNameInput
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            attr
        [Field/target]
            Boolean
`;