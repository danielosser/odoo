/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DiscussSidebarComponent
        [Model/fields]
            discuss
        [Model/template]
            root
                startMeetingButtonContainer
                    startMeetingButton
                separator1
                categoryMailbox
                    mailboxInbox
                    mailboxStarred
                    mailboxHistory
                separator2
                quickSearch
                categoryChannel
                categoryChat
        [Model/lifecycles]
            onUpdate
`;
