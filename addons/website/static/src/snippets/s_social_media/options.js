/** @odoo-module **/

import options from 'web_editor.snippets.options';

const core = require('web.core');
const _t = core._t;

let websiteId;
const urlInDbByFieldName = { // This will filled in start().
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
const localURLByDbField = {
    'social_facebook': '/website/social/facebook',
    'social_twitter': '/website/social/twitter',
    'social_youtube': '/website/social/youtube',
    'social_instagram': '/website/social/instagram',
    'social_linkedin': '/website/social/linkedin',
    'social_github': '/website/social/github',
    'item': '',
};



options.registry.SocialMedia = options.Class.extend({
    async start() {
        // Fetch URL for db links.
        await this._rpc({
            model: 'website',
            method: 'search_read',
            args: [[], ['social_facebook', 'social_twitter', 'social_instagram', 'social_youtube', 'social_github', 'social_linkedin']],
            limit: 1,
        }).then(function (res) {
            if (res) {
                delete res[0].id;
                for (let key in res[0]) {
                    urlInDbByFieldName[key] = res[0][key];
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
                        display_name: _t(urlInDbByFieldName[dbFieldByUrl[href]]),
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
            //console.log('listEntries', listEntries)
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

            // build table for db links
            if (entry.el_name in localURLByDbField) {
                newDBLinks[entry.el_name] = entry.display_name;
                urlInDbByFieldName[entry.el_name] = entry.display_name;
            } else {
                // Handle URL change for custom links.
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
