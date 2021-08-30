/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MailTemplate
        [Model/fields]
            activities
            id
            name
        [Model/id]
            MailTemplate/id
        [Model/actions]
            MailTemplate/preview
            MailTemplate/send
`;
