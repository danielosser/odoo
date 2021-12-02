/** @odoo-module **/
import {_t} from 'web.core';
import options from 'web_editor.snippets.options';


let websiteId;
// Maybe those 3 dictionaries should be initialized in start() ?
const dbData = { // This will be filled in start() with urls in the database.
    'social_facebook': '',
    'social_twitter': '',
    'social_instagram': '',
    'social_youtube': '',
    'social_linkedin': '',
    'social_github': '',
};
const dbFieldByUrl = {
    '/website/social/facebook': 'social_facebook',
    '/website/social/twitter': 'social_twitter',
    '/website/social/youtube': 'social_youtube',
    '/website/social/instagram': 'social_instagram',
    '/website/social/linkedin': 'social_linkedin',
    '/website/social/github': 'social_github',
};
const localUrlByDbField = {
    'social_facebook': '/website/social/facebook',
    'social_twitter': '/website/social/twitter',
    'social_youtube': '/website/social/youtube',
    'social_instagram': '/website/social/instagram',
    'social_linkedin': '/website/social/linkedin',
    'social_github': '/website/social/github',
};



options.registry.SocialMedia = options.Class.extend({
    async start() {
        // Fetch URL for db links.
        await this._rpc({
            model: 'website',
            method: 'search_read',
            args: [[], Object.keys(dbData)],
            limit: 1,
        }).then(function (res) {
            if (res) {
                delete res[0].id;
                for (let key in res[0]) {
                    dbData[key] = res[0][key];
                }
            }
        });
        // Fetch the website id.
        this.trigger_up('context_get', {
            callback: (ctx) => {
                websiteId = ctx['website_id'];
            },
        });
    },
    /**
     * @override
     */
    _computeWidgetState: function (methodName, params) { // This will pass de data to snippets.options to render the we-list widget.
        if (methodName === 'renderListItems') {
            const listEntries = [];
            const anchorsEls = this.$target[0].querySelectorAll('a');
            for (let i = 0; i < anchorsEls.length; i++) {
                const href = anchorsEls[i].getAttribute('href');
                if (dbFieldByUrl[href]) {
                    // It is a DB social link
                    listEntries.push({
                        id: _t(dbFieldByUrl[href]),
                        display_name: _t(dbData[dbFieldByUrl[href]]),
                        undeletable: true,
                        is_toggled: !anchorsEls[i].classList.contains('d-none'),
                    });
                } else {
                    // It's a custom social link.
                    listEntries.push({
                        id: _t(anchorsEls[i].dataset.socialId),
                        display_name: _t(href),
                        undeletable: false,
                        is_toggled: !anchorsEls[i].classList.contains('d-none'),
                    });
                }
            }
            return JSON.stringify(listEntries);
        }
        return this._super(methodName, params);
    },
    /**
     * Apply the we-list on the target
     *
     * @param  {} value array of objects {name: 'https://...', el_name: 'social_facebook', is_toggled: true, undeletable: false}
     */
    renderListItems: async function (previewMode, value, params) { // This will receive data from we-list widget and will update the target.
        const entries = JSON.parse(value);
        const newDBLinks = [];
        // TODO : handle the case where an element have been removed from the list.
        const anchorsEls = this.$target[0].querySelectorAll('a[data-social-id]');
        if (entries.length < anchorsEls.length) {
            console.log('[SocialMedia] Warning: some elements have been removed from the list.');
            const existingSocialIds = entries.map(entry => entry.el_name);
            console.log('[SocialMedia] existingSocialIds: ', existingSocialIds);
            for (let i = 0; i < anchorsEls.length; i++) {
                const socialId = anchorsEls[i].dataset.socialId;
                if (!existingSocialIds.includes(socialId)) {
                    console.log('[SocialMedia] Removing socialId: ', socialId);
                    console.log('[SocialMedia] Removing anchorEl: ', anchorsEls[i]);
                }
            }
        }
        //const anchorsEls = this.$target[0].querySelectorAll('a[data-social-id]');
/*         if (entries.length < anchorsEls.length) {
            const existingSocialIds = entries.map(entry => entry.el_name);
            console.log('I have to delete', existingSocialIds);
            for (let i = 0; i < anchorsEls.length; i++) {
                const socialId = anchorsEls[i].dataset.socialId;
                if (!existingSocialIds.includes(socialId)) {
                    console.log('remove', socialId)
                    this.$target[0].querySelector(`a[data-social-id=${socialId}]`).remove();
                }
            }
        } */
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const anchorEl = this.$target[0].querySelector(`[data-social-id="${entry.el_name}"]`);
            if (!anchorEl) {
                const newAnchorEl = document.createElement('a');
                newAnchorEl.setAttribute('href', entry.display_name);
                newAnchorEl.dataset.socialId = entry.el_name;
                newAnchorEl.setAttribute('target', '_blank');
                newAnchorEl.setAttribute('class', '#{_link_classes}');
                const iEl = document.createElement('i');
                iEl.setAttribute('class', 'fa fa-amazon rounded shadow-sm');
                newAnchorEl.appendChild(iEl);
                this.$target[0].insertAdjacentElement('beforeend', newAnchorEl);
                continue;
            }
            // Handle toggle visibility of the link
            anchorEl.classList.toggle('d-none', !entry.is_toggled);

            // fill table for db links
            if (entry.el_name in localUrlByDbField) {
                newDBLinks[entry.el_name] = entry.display_name;
                dbData[entry.el_name] = entry.display_name;
            } else {
                // Handle URL change for custom links.
                // TODO search a amazing fa-icon that match the url.
                anchorEl.setAttribute('href', entry.display_name);
            }
            // Place it at the correct position
            this.$target[0].insertAdjacentElement('beforeend', anchorEl);
        }

        // Do a RPC to update the DB links.
        this._rpc({
            model: 'website',
            method: 'write',
            args: [
                [websiteId],
                {
                    ['social_facebook']: newDBLinks['social_facebook'],
                    ['social_twitter']: newDBLinks['social_twitter'],
                    ['social_youtube']: newDBLinks['social_youtube'],
                    ['social_instagram']: newDBLinks['social_instagram'],
                    ['social_linkedin']: newDBLinks['social_linkedin'],
                    ['social_github']: newDBLinks['social_github'],
                }
            ],
        });
    },
    /**
     * @override
     */
    _renderCustomXML: async function (uiFragment) {
        const weListEl = uiFragment.querySelector('we-list');
    },
});

export default {
    SocialMedia: options.registry.SocialMedia,
};
