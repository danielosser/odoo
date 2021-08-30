/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Tracked translate transformations on image visualisation. This is
        not observed for re-rendering because they are used to compute zoomer
        style, and this is changed directly on zoomer for performance
        reasons (overhead of making vdom is too significant for each mouse
        position changes while dragging)
    {Field}
        [Field/name]
            translateX
        [Field/model]
            AttachmentViewerComponent
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            0
`;