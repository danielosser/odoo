/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            EmojisPopoverComponent
        [Model/fields]
            emojis
        [Model/template]
            root
                emoji
        [Model/actions]
            EmojisPopoverComponent/close
            EmojisPopoverComponent/contains
        [Model/lifecycles]
            onUpdate
`;
