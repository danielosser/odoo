/** @odoo-module **/

import { useModels } from '@mail/component_hooks/use_models/use_models';
import { useRefs } from '@mail/component_hooks/use_refs/use_refs';

const { Component } = owl;

export class RtcController extends Component {

    /**
     * @override
     */
    constructor(...args) {
        super(...args);
        useModels();
        this._getRefs = useRefs();
    }

    //--------------------------------------------------------------------------
    // Getters / Setters
    //--------------------------------------------------------------------------

    /**
     * @returns {mail.thread}
     */
    get thread() {
        return this.env.models['mail.thread'].get(this.props.threadLocalId || this.env.messaging.activeCallThreadLocalId);
    }

    /**
     * @returns {boolean}
     */
    get isCurrentActiveCall() {
        return this.env.messaging.activeCallThreadLocalId &&
         (!this.props.threadLocalId || this.props.threadLocalId === this.env.messaging.activeCallThreadLocalId);
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    _onClickDeafen(ev) {
        this.env.mailRtc.toggleDeaf();
    }

    _onClickMicrophone(ev) {
        this.env.mailRtc.toggleMicrophone();
    }

    _onClickCamera(ev) {
        this.env.mailRtc.toggleUserVideo();
    }

    _onClickSettings(ev) {
        this.env.messaging.userSetting.toggleWindow();
    }

    _onClickScreen(ev) {
        this.env.mailRtc.toggleScreenShare();
    }

    async _onClickPhone(ev) {
        await this.env.messaging.toggleCall({
            threadLocalId: this.props.threadLocalId,
        });
    }
}

Object.assign(RtcController, {
    props: {
        threadLocalId: {
            type: String,
            optional: true, // if not defined, represents the current active call
        },
    },
    template: 'mail.RtcController',
});
