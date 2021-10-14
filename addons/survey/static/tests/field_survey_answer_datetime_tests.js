/** @odoo-module **/

import FormView from 'web.FormView';
import testUtils from 'web.test_utils';

const createView = testUtils.createView;

QUnit.module('field_survey_answer_datetime', {
    beforeEach: function () {
        this.data = {
            'survey.question': {
                fields: {
                    title: {string: "Tittle", type: "char"},
                    entry_datetime: {string: "Entry Datetime", type: "datetime"},
                    exit_datetime: {string: "End Datetime", type: "datetime"},
                },
                records: [
                    {
                        id: 1,
                        title: 'What is your entry and exit datetime?',
                        entry_datetime: '2017-02-08 10:00:00',
                        exit_datetime: '2017-02-08 10:00:00'
                    },
                ],
            },
        };
    },
}, function () {
    QUnit.test('Check that "survey_answer_datetime" widget displays absolute datetime', async function (assert) {
        assert.expect(4);

        const form = await createView({
            View: FormView,
            model: 'survey.question',
            data: this.data,
            arch: `<form>
                    <field name="entry_datetime" widget="survey_answer_datetime"/>
                    <field name="exit_datetime"/>
                </form>`,
            res_id: 1,
            session: {
                getTZOffset: function () {
                    return 330;
                },
            },
            viewOptions: {
                mode: 'edit',
            },
        });

        // Check that dates are displayed correctly in edit mode
        assert.strictEqual(form.$('.o_datepicker_input:first').val(), '02/08/2017 10:00:00',
            "'survey_answer_datetime' widget should not consider TZ offset in edit mode");
        assert.strictEqual(form.$('.o_datepicker_input:last').val(), '02/08/2017 15:30:00',
            "normal datetime widget should consider TZ offset in edit mode");

        await testUtils.form.clickSave(form);

        // Check that dates are displayed correctly in readonly mode
        assert.strictEqual(form.$('.o_field_widget:first').text(), '02/08/2017 10:00:00',
            "'survey_answer_datetime' widget should not consider TZ offset in readonly mode");
        assert.strictEqual(form.$('.o_field_widget:last').text(), '02/08/2017 15:30:00',
            "normal datetime widget should consider TZ offset in readonly mode");

        form.destroy();
    });
});
