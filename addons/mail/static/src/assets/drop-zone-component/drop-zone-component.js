/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            DropZoneComponent
        [Model/fields]
            _dragCount
            isDraggingInside
        [Model/template]
            root
                content
                    label
                    icon
        [Model/actions]
            DropZoneComponent/_isDragSourceExternalFile
            DropZoneComponent/contains
`;
