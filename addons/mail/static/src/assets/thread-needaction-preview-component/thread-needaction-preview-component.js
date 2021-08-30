/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ThreadNeedactionPreviewComponent
        [Model/fields]
            thread
        {Dev/comment}
            The preview template is used by the discuss in mobile,
            and by the systray menu in order to show preview of threads.
        [Model/template]
            root
                sidebar
                    imageContainer
                        image
                        partnerImStatusIcon
                content
                    header
                        name
                        counter
                        headerAutogrowSeparator
                        date
                    core
                        inlineText
                            messageAuthorPrefix
                            inlineTextAfterPrefix
                        coreAutogrowSeparator
                        markAsRead
        [Model/actions]
            ThreadNeedactionPreviewComponent/getImage
`;
