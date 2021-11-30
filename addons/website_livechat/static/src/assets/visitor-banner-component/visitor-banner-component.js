/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            VisitorBannerComponent
        [Model/fields]
            visitor
        [Model/template]
            root
                sidebar
                    avatarContainer
                        avatar
                        onlineStatusIcon
                content
                    country
                    visitor
                    language
                        languageIcon
                        languageName
                    website
                        websiteIcon
                        websiteName
                    history
                        historyIcon
                        historyText
`;
