/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        If set, keyboard shortcuts from text input to send message.
        If not set, will use default values from 'ComposerTextInput'.
    {Field}
        [Field/name]
            textInputSendShortcuts
        [Field/model]
            ComposerViewComponent
        [Field/type]
            attr
        [Field/target]
            Array
            {Dev/comment}
                (element: String)
`;
