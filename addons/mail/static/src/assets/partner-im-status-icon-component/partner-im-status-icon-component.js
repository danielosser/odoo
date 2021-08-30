/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            PartnerImStatusIconComponent
        [Model/fields]
            hasBackground
            hasOpenChat
            partner
        [Model/template]
            root
                outerBackground
                innerBackground
                iconOnline
                iconAway
                iconOffline
                iconBot
`;
