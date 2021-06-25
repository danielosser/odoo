/** @odoo-module **/

import { useShouldUpdateBasedOnProps } from '@mail/component_hooks/use_should_update_based_on_props/use_should_update_based_on_props';
import { useStore } from '@mail/component_hooks/use_store/use_store';
import { FollowerSubtype } from '@mail/components/follower_subtype/follower_subtype';

const { Component, QWeb } = owl;

const components = { FollowerSubtype };

export class FollowerSubtypeList extends Component {

    /**
     * @override
     */
    constructor(...args) {
        super(...args);
        useShouldUpdateBasedOnProps();
        useStore(props => {
            const followerSubtypeList = this.env.services.messaging.models['mail.follower_subtype_list'].get(props.localId);
            const follower = followerSubtypeList
                ? followerSubtypeList.follower
                : undefined;
            const followerSubtypes = follower ? follower.subtypes : [];
            return {
                follower: follower ? follower.__state : undefined,
                followerSubtypeList: followerSubtypeList
                    ? followerSubtypeList.__state
                    : undefined,
                followerSubtypes: followerSubtypes.map(subtype => subtype.__state),
            };
        }, {
            compareDepth: {
                followerSubtypes: 1,
            },
        });
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @returns {mail.follower_subtype_list}
     */
    get followerSubtypeList() {
        return this.env.services.messaging.models['mail.follower_subtype_list'].get(this.props.localId);
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * Called when clicking on cancel button.
     *
     * @private
     * @param {MouseEvent} ev
     */
    _onClickCancel(ev) {
        this.followerSubtypeList.follower.closeSubtypes();
    }

    /**
     * Called when clicking on apply button.
     *
     * @private
     * @param {MouseEvent} ev
     */
    _onClickApply(ev) {
        this.followerSubtypeList.follower.updateSubtypes();
    }

}

Object.assign(FollowerSubtypeList, {
    components,
    props: {
        localId: String,
    },
    template: 'mail.FollowerSubtypeList',
});

QWeb.registerComponent('FollowerSubtypeList', FollowerSubtypeList);
