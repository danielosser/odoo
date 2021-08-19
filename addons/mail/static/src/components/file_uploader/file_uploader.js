/** @odoo-module **/

import { registerMessagingComponent } from '@mail/utils/messaging_component';

import core from 'web.core';

const { Component } = owl;
const { useRef } = owl.hooks;

export class FileUploader extends Component {

    /**
     * @override
     */
    constructor(...args) {
        super(...args);
        this._fileInputRef = useRef('fileInput');
        this._fileUploadId = _.uniqueId('o_FileUploader_fileupload');
        this._onAttachmentUploaded = this._onAttachmentUploaded.bind(this);
    }

    mounted() {
        $(window).on(this._fileUploadId, this._onAttachmentUploaded);
    }

    willUnmount() {
        $(window).off(this._fileUploadId);
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @param {FileList|Array} files
     * @returns {Promise}
     */
    async uploadFiles(files) {
        await this._unlinkExistingAttachments(files);
        this._createUploadingAttachments(files);
        await this._performUpload(files);
        this._fileInputRef.el.value = '';
    }

    openBrowserFileUploader() {
        this._fileInputRef.el.click();
    }

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @deprecated
     * @private
     * @param {Object} fileData
     * @returns {mail.attachment}
     */
    _createAttachment(fileData) {
        return this.messaging.models['mail.attachment'].create(Object.assign(
            {},
            fileData,
            this.props.newAttachmentExtraData
        ));
    }

    /**
     * @private
     * @param {File} file
     * @returns {FormData}
     */
    _createFormData(file) {
        let formData = new window.FormData();
        formData.append('callback', this._fileUploadId);
        formData.append('csrf_token', core.csrf_token);
        formData.append('id', this.props.uploadId);
        formData.append('model', this.props.uploadModel);
        formData.append('ufile', file, file.name);
        return formData;
    }

    /**
     * @private
     * @param {FileList|Array} files
     */
    _createUploadingAttachments(files) {
        for (const file of files) {
            this.messaging.models['mail.attachment'].create(
                Object.assign(
                    {
                        filename: file.name,
                        isUploading: true,
                        name: file.name
                    },
                    this.props.newAttachmentExtraData
                ),
            );
        }
    }
    /**
     * @private
     * @param {FileList|Array} files
     * @returns {Promise}
     */
    async _performUpload(files) {
        for (const file of files) {
            const uploadingAttachment = this.messaging.models['mail.attachment'].find(attachment =>
                attachment.isUploading &&
                attachment.filename === file.name
            );
            if (!uploadingAttachment) {
                // Uploading attachment no longer exists.
                // This happens when an uploading attachment is being deleted by user.
                continue;
            }
            try {
                const response = await this.messaging.browser.fetch('/web/binary/upload_attachment', {
                    method: 'POST',
                    body: this._createFormData(file),
                    signal: uploadingAttachment.uploadingAbortController.signal,
                });
                let html = await response.text();
                const template = document.createElement('template');
                template.innerHTML = html.trim();
                window.eval(template.content.firstChild.textContent);
            } catch (e) {
                if (e.name !== 'AbortError') {
                    throw e;
                }
            }
        }
    }

    /**
     * @private
     * @param {FileList|Array} files
     * @returns {Promise}
     */
    async _unlinkExistingAttachments(files) {
        for (const file of files) {
            const attachment = this.props.attachmentLocalIds
                .map(attachmentLocalId => this.messaging.models['mail.attachment'].get(attachmentLocalId))
                .find(attachment => attachment.name === file.name && attachment.size === file.size);
            // if the files already exits, delete the file before upload
            if (attachment) {
                attachment.remove();
            }
        }
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {jQuery.Event} ev
     * @param {...Object} filesData
     */
    _onAttachmentUploaded(ev, ...filesData) {
        for (const fileData of filesData) {
            const { error, filename, id, mimetype, name, size } = fileData;
            if (error || !id) {
                this.env.services['notification'].notify({
                    type: 'danger',
                    message: error,
                });
                const relatedUploadingAttachments = this.messaging.models['mail.attachment']
                    .find(attachment =>
                        attachment.filename === filename &&
                        attachment.isUploading
                    );
                for (const attachment of relatedUploadingAttachments) {
                    attachment.delete();
                }
                return;
            }
            const attachment = this.messaging.models['mail.attachment'].insert(
                Object.assign(
                    {
                        filename,
                        id,
                        mimetype,
                        name,
                        size,
                    },
                    this.props.newAttachmentExtraData
                ),
            );
            this.trigger('o-attachment-created', { attachment });
        }
    }

    /**
     * Called when there are changes in the file input.
     *
     * @private
     * @param {Event} ev
     * @param {EventTarget} ev.target
     * @param {FileList|Array} ev.target.files
     */
    async _onChangeAttachment(ev) {
        await this.uploadFiles(ev.target.files);
    }

}

Object.assign(FileUploader, {
    defaultProps: {
        uploadId: 0,
        uploadModel: 'mail.compose.message'
    },
    props: {
        attachmentLocalIds: {
            type: Array,
            element: String,
        },
        newAttachmentExtraData: {
            type: Object,
            optional: true,
        },
        uploadId: Number,
        uploadModel: String,
    },
    template: 'mail.FileUploader',
});

registerMessagingComponent(FileUploader, {
    propsCompareDepth: {
        attachmentLocalIds: 1,
        newAttachmentExtraData: 3,
    },
});
