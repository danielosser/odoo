/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            Follower
        [Model/fields]
            _subtypesListDialog
            followedThread
            id
            isActive
            isEditable
            partner
            selectedSubtypes
            subtypeList
            subtypes
        [Model/id]
            Follower/id
        [Model/actions]
            Follower/closeSubtypes
            Follower/convertData
            Follower/openProfile
            Follower/remove
            Follower/selectSubtype
            Follower/showSubtypes
            Follower/unselectSubtype
            Follower/updateSubtypes
`;
