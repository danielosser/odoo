/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            FollowerListMenuComponent
        [Model/fields]
            device
            isDisabled
            isDropdownOpen
            thread
        [Model/template]
            root
                followers
                    buttonFollowers
                        buttonFollowersIcon
                        buttonFollowersCount
                    dropdown
                        addFollowersButton
                        separator
                        follower
        [Model/actions]
            FollowerListMenuComponent/_hide
`;
