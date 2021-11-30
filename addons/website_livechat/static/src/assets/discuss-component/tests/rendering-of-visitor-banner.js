/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            rendering of visitor banner
        [Test/feature]
            website_livechat
        [Test/model]
            DiscussComponent
        [Test/assertions]
            13
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        livechat
                    [mail.channel/id]
                        11
                    [mail.channel/livechat_operator_id]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                    [mail.channel/livechat_visitor_id]
                        11
                    [mail.channel/members]
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            @record
                            .{Test/data}
                            .{Data/publicPartnerId}
                []
                    [Record/traits]
                        res.country
                    [res.country/code]
                        FAKE
                    [res.country/id]
                        11
                []
                    [Record/traits]
                        website.visitor
                    [website.visitor/country_id]
                        11
                    [website.visitor/display_name]
                        Visitor #11
                    [website.visitor/history]
                        Home → Contact
                    [website.visitor/id]
                        11
                    [website.visitor/is_connected]
                        true
                    [website.visitor/lang_name]
                        English
                    [website.visitor/website_name]
                        General website
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            @testEnv
            .{Thread/open}
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        11
                    [Thread/model]
                        mail.channel
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                [2]
                    should have a visitor banner
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/avatar}
                [2]
                    should show the visitor avatar in the banner
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/avatar}
                    .{web.Element/src}
                    .{=}
                        /mail/static/src/img/smiley/avatar.jpg
                [2]
                    should show the default avatar
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/onlineStatusIcon}
                [2]
                    should show the visitor online status icon on the avatar
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/country}
                    .{web.Element/src}
                    .{=}
                        /base/static/img/country_flags/FAKE.png
                [2]
                    should show the flag of the country of the visitor
            {Test/assert}
                [0]
                    @records
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/visitor}
                [2]
                    should show the visitor name in the banner
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/visitor}
                    .{web.Element/textContent}
                    .{=}
                        Visitor #11
                [2]
                    should have 'Visitor #11' as visitor name
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/language}
                [2]
                    should show the visitor language in the banner
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/language}
                    .{web.Element/textContent}
                    .{=}
                        English
                [2]
                    should have 'English' as language of the visitor
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/website}
                [2]
                    should show the visitor website in the banner
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/website}
                    .{web.Element/textContent}
                    .{=}
                        General website
                [2]
                    should have 'General website' as website of the visitor
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/history}
                [2]
                    should show the visitor history in the banner
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussComponents}
                    .{Collection/first}
                    .{DiscussComponent/visitorBanner}
                    .{VisitorBannerComponent/history}
                    .{web.Element/textContent}
                    .{=}
                        Home → Contact
                [2]
                    should have 'Home → Contact' as history of the visitor
`;
