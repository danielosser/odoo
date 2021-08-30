/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ActivityBoxComponent
        [Model/fields]
            activityBoxView
        [Model/template]
            root
                title
                    titleStartLine
                    titleText
                        titleTextIcon
                        titleTextLabel
                    titleBadges
                        titleBadgeOverdue
                        titleBadgeToday
                        titleBadgeFuture
                    titleEndLine
                activityList
                    activityForeach
`;
