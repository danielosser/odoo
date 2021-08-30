/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ActivityComponent
        [Model/fields]
            activity
            areDetailsVisible
        [Model/template]
            root
                sidebar
                    user
                        userAvatar
                        iconContainer
                            icon
                core
                    info
                        dueDateText
                        summary
                        type
                        userName
                        detailsButton
                            detailsButtonIcon
                    details
                        descriptionList
                            descriptionTermType
                            descriptionDetailType
                            descriptionTermCreated
                            detailsCreation
                                detailsCreationDatetime
                                detailsCreatorAvatar
                                detailsCreator
                            descriptionTermAssigned
                            detailsAssignation
                                detailsAssignationUserAvatar
                                detailsAssignationUserName
                            descriptionTermDueOn
                            detailsDueDate
                                deadlineDateText
                    note
                    mailTemplates
                        mailTemplateForeach
                    tools
                        markDonePopover
                        uploadButton
                            uploadButtonIcon
                            uploadButtonLabel
                        fileUploader
                        editButton
                            editButtonIcon
                            editButtonLabel
                        cancelButton
                            cancelButtonIcon
                            cancelButtonLabel
`;
