/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            FileUploaderComponent
        [Model/fields]
            _fileUploadId
            composerView
            device
            thread
        [Model/template]
            root
                input
        [Model/actions]
            FileUploaderComponent/_createFormData
            FileUploaderComponent/_createUploadingAttachments
            FileUploaderComponent/_onAttachmentUploaded
            FileUploaderComponent/_performUpload
            FileUploaderComponent/getAttachmentNextTemporaryId
            FileUploaderComponent/openBrowserFileUploader
            FileUploaderComponent/uploadFiles
`;
