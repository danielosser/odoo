/** @odoo-module **/

import { Define } from '@mail/define';

import { ComponentAdapter } from 'web.OwlCompatibility';

class FormViewDialogComponentAdapter extends ComponentAdapter {

    renderWidget() {
        // Ensure the dialog is properly reconstructed. Without this line, it is
        // impossible to open the dialog again after having it closed a first
        // time, because the DOM of the dialog has disappeared.
        return this.willStart();
    }

}

export default Define`
    {Model}
        [Model/name]
            ComposerSuggestedRecipientComponent
        [Model/components]
            ${FormViewDialogComponentAdapter}
        [Model/fields]
            _isDialogOpen
            id
            suggestedRecipientInfo
        [Model/template]
            root
                checkbox
                    checkboxInput
                    checkboxLabel
                formViewDialog
        [Model/lifecycles]
            onUpdate
`;
