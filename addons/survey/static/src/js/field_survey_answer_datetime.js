/** @odoo-module alias=survey.field_survey_answer_datetime **/


import core from 'web.core';
import { FieldDateTime } from 'web.basic_fields';
import fieldRegistry from 'web.field_registry';

const _lt = core._lt;

/**
  * Datetime widget to show absolute time(without considering TZ offset). This is needed
  * for a specific case of survey, where we can enable scoring. based on datetime field.
  * Here, the value we choose as 'Correct Answer' should not be displayed based on TZ.
  *
  * @class
  */

export const SurveyAnswerFieldDateTime = FieldDateTime.extend({
    description: _lt("Date & Time: Specific for survey answer"),

    /**
     * Disable timezone on the field
     *
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);
        this.formatOptions.timezone = false;
        if (this.value) {
            this.datepickerOptions.defaultDate = this.value;
        }
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * Return the datepicker value as it is(without considering TZ offset)
     *
     * @override
     * @private
     */
    _getValue: function () {
        return this.datewidget.getValue();
    },

    /**
     * Set the datepicker to the right value(without considering TZ offset)
     *
     * @override
     * @private
     */
    _renderEdit: function () {
        this.datewidget.setValue(this.value);
        this.$input = this.datewidget.$input;
    },
});

fieldRegistry.add('survey_answer_datetime', SurveyAnswerFieldDateTime);
