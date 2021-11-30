/** @odoo-module **/

import PosComponent from 'point_of_sale.PosComponent';
import ProductScreen from 'point_of_sale.ProductScreen';
import Registries from 'point_of_sale.Registries';
import { useListener } from 'web.custom_hooks';

export class RewardButton extends PosComponent {
    constructor() {
        super(...arguments);
        useListener('click', this.onClick);
    }

    hasClaimableRewards() {
        const order = this.env.pos.get_order();
        const rewards = order ? order.get_claimable_rewards() : [];
        return rewards.length > 0;
    }

    /**
     * Applies the reward on the current order, if multiple products can be claimed opens a popup asking for which one.
     *
     * @param {Object} reward 
     * @param {Integer} coupon_id 
     */
    async _applyReward(reward, coupon_id) {
        const args = {};
        if (reward.reward_type === 'product' && reward.multi_product) {
            const productsList = reward.reward_product_ids.map((product_id) => ({
                id: product_id,
                label: this.env.pos.db.get_product_by_id(product_id).display_name,
                item: product_id,
            }));
            const { confirmed, payload: selectedProduct } = await this.showPopup('SelectionPopup', {
                title: this.env._t('Please select a product for this reward'),
                list: productsList,
            });
            if (!confirmed) {
                return false;
            }
            args['product'] = selectedProduct;
        }
        return this.env.pos.get_order()._apply_reward(reward, coupon_id, args);
    }

    async onClick() {
        const order = this.env.pos.get_order();
        let client = order.get_client();
        // NOTE: we might want to check for claimable rewards here aswell as we may allow rewards to be claimed regardless of customer being set.
        if (!client) {
            this.trigger('close-popup');
            // IMPROVEMENT: This code snippet is similar to selectClient of PaymentScreen.
            const { confirmed, payload: newClient } = await this.showTempScreen('ClientListScreen', { client });
            if (confirmed) {
                order.set_client(newClient);
                order.updatePricelist(newClient);
            }
        }
        const rewards = order.get_claimable_rewards();
        if (rewards.length === 0) {
            await this.showPopup('ErrorPopup', {
                title: this.env._t('No rewards available.'),
                body: this.env._t('There are not rewards claimable for this customer.')
            });
            return false;
        } else if (rewards.length === 1) {
            return await this._applyReward(rewards[0].reward, rewards[0].coupon_id);
        } else {
            const rewardsList = rewards.map((reward) => ({
                id: reward.reward.id,
                label: reward.reward.description,
                item: reward,
            }));
            const { confirmed, payload: selectedReward } = await this.showPopup('SelectionPopup', {
                title: this.env._t('Please select a reward'),
                list: rewardsList,
            });
            if (confirmed) {
                return this._applyReward(selectedReward.reward, selectedReward.coupon_id);
            }
        }
        return false;
    }
}

RewardButton.template = 'RewardButton';

ProductScreen.addControlButton({
    component: RewardButton,
    condition: function() {
        return this.env.pos.config.use_coupon_programs || this.env.pos.config.loyalty_program_id || this.env.pos.config.use_gift_card;
    }
});

Registries.Component.add(RewardButton);
