/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        If true composer will log a note, else a comment will be posted.
    {Field}
        [Field/name]
            isLog
        [Field/model]
            Composer
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
