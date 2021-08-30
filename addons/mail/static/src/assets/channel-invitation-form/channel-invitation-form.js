/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ChannelInvitationForm
        [Model/fields]
            channelInvitationFormComponents
            chatWindow
            doFocusOnSearchInput
            hasPendingSearchRpc
            hasSearchRpcInProgress
            inviteButtonText
            popoverView
            searchResultCount
            searchTerm
            selectablePartners
            selectedPartners
            thread
            threadView
        [Model/id]
            ChannelInvitationForm/chatWindow
            .{|}
                ChannelInvitationForm/threadView
        [Model/actions]
            ChannelInvitationForm/onClickInvite
            ChannelInvitationForm/onClickSelectablePartner
            ChannelInvitationForm/onClickSelectedPartner
            ChannelInvitationForm/onComponentUpdate
            ChannelInvitationForm/onInputPartnerCheckbox
            ChannelInvitationForm/onInputSearch
            ChannelInvitationForm/searchPartnersToInvite
`;
