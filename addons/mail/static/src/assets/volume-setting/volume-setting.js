/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            VolumeSetting
        [Model/fields]
            guest
            id
            partner
            userSetting
            volume
        [Model/id]
            VolumeSetting/id
        [Model/onChanges]
            VolumeSetting/_onChangeVolume
`;
