/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            Activity
        [Model/fields]
            assignee
            attachments
            canWrite
            category
            chainingType
            creator
            dateCreate
            dateDeadline
            feedbackBackup
            icon
            id
            isCurrentPartnerAssignee
            mailTemplates
            note
            requestingPartner
            state
            summary
            thread
            type
        [Model/id]
            Activity/id
        [Model/actions]
            Activity/convertData
            Activity/deleteServerRecord
            Activity/edit
            Activity/fetchAndUpdate
            Activity/markAsDone
            Activity/markAsDoneAndScheduleNext
`;
