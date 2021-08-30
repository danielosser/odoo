/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the ending position where to place the selection on this
        thread description input (zero-based index). This value is not a
        representation of current selection, but an instruction to set a new
        selection. Must be set together with 'doSetSelectionDirectionOnThreadDescriptionInput'
        and 'doSetSelectionStartOnThreadDescriptionInput' to have an effect.
    {Field}
        [Field/name]
            doSetSelectionEndOnThreadDescriptionInput
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            attr
        [Field/target]
            Boolean
`;