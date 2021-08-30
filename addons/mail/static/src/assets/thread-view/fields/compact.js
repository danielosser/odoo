/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            compact
        [Field/model]
            ThreadView
        [Field/related]
            ThreadView/threadViewer
            ThreadViewer/compact
`;
