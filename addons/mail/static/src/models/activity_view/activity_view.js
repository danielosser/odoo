/** @odoo-module **/

import { registerModel } from '@mail/model/model_core';
import { attr, many2one } from '@mail/model/model_field';

registerModel({
    name: 'mail.activity_view',
    identifyingFields: ['activityBoxView', 'activity'],
    lifecycleHooks: {
        _created() {
            this.onAttachmentCreated = this.onAttachmentCreated.bind(this);
            this.onClickActivity = this.onClickActivity.bind(this);
            this.onClickCancel = this.onClickCancel.bind(this);
            this.onClickEdit = this.onClickEdit.bind(this);
            this.onClickUploadDocument = this.onClickUploadDocument.bind(this);
            this.onClickDetailsButton = this.onClickDetailsButton.bind(this);
        }
    },
    recordMethods: {
        /**
         * @param {CustomEvent} ev
         * @param {Object} ev.detail
         * @param {mail.attachment} ev.detail.attachment
         */
        onAttachmentCreated(ev) {
            this.activity.markAsDone({ attachments: [ev.detail.attachment] });
        },
        /**
         * Handles the click on a link inside the activity.
         *
         * @param {MouseEvent} ev
         */
        onClickActivity(ev) {
            if (
                ev.target.tagName === 'A' &&
                ev.target.dataset.oeId &&
                ev.target.dataset.oeModel
            ) {
                this.messaging.openProfile({
                    id: Number(ev.target.dataset.oeId),
                    model: ev.target.dataset.oeModel,
                });
            }
        },
        /**
         * Handles the click on the cancel button
         */
        async onClickCancel() {
            await this.activity.deleteServerRecord();
            this.component.trigger('reload', { keepChanges: true });
        },
        /**
         * Handles the click on the edit button
         */
        onClickEdit() {
            this.activity.edit();
        },
        /**
         * Handles the click on the upload document button. This open the file
         * explorer for upload.
         */
        onClickUploadDocument() {
            this.fileUploaderRef.comp.openBrowserFileUploader();
        },
        /**
         * Handles the click on the detail button
         */
        onClickDetailsButton() {
            this.update({ areDetailsVisible: !this.areDetailsVisible });
        },
    },
    fields: {
        activityBoxView: many2one('mail.activity_box_view', {
            inverse: 'activityViews',
            readonly: true,
            required: true,
        }),
        activity: many2one('mail.activity', {
            inverse: 'activityView',
            required: true,
            readonly: true,
        }),
        /**
         * Determines if the details are visible.
         */
        areDetailsVisible: attr({
            default: false,
        }),
        /**
         * States the OWL attachment box component for this thread.
         */
        component: attr(),
        /**
         * States the OWL ref of the "fileUploader" of this thread.
         */
        fileUploaderRef: attr(),
    }
});
