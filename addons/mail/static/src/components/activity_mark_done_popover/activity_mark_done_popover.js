/** @odoo-module **/

import { registerMessagingComponent } from '@mail/utils/messaging_component';

const { Component, onMounted, useRef } = owl;

export class ActivityMarkDonePopover extends Component {

    /**
     * @override
     */
    setup() {
        super.setup();
        this._feedbackTextareaRef = useRef('feedbackTextarea');
        onMounted(() => this._mounted());
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    _mounted() {
        this._feedbackTextareaRef.el.focus();
        if (this.activity.feedbackBackup) {
            this._feedbackTextareaRef.el.value = this.activity.feedbackBackup;
        }
    }

    /**
     * @returns {mail.activity}
     */
    get activity() {
        return this.messaging && this.messaging.models['mail.activity'].get(this.props.activityLocalId);
    }

    /**
     * @returns {string}
     */
    get DONE_AND_SCHEDULE_NEXT() {
        return this.env._t("Done & Schedule Next");
    }

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _close() {
        this.trigger('o-popover-close');
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _onBlur() {
        this.activity.update({
            feedbackBackup: this._feedbackTextareaRef.el.value,
        });
    }

    /**
     * @private
     */
    _onClickDiscard() {
        this._close();
    }

    /**
     * @private
     */
    async _onClickDone() {
        await this.activity.markAsDone({
            feedback: this._feedbackTextareaRef.el.value,
        });
        this.trigger('reload', { keepChanges: true });
    }

    /**
     * @private
     */
    _onClickDoneAndScheduleNext() {
        this.activity.markAsDoneAndScheduleNext({
            feedback: this._feedbackTextareaRef.el.value,
        });
    }

    /**
     * @private
     */
    _onKeydown(ev) {
        if (ev.key === 'Escape') {
            this._close();
        }
    }

}

Object.assign(ActivityMarkDonePopover, {
    props: {
        activityLocalId: String,
    },
    template: 'mail.ActivityMarkDonePopover',
});

registerMessagingComponent(ActivityMarkDonePopover);
