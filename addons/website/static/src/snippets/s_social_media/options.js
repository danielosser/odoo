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
     * @param  {} value array of objects 
     * {name: 'https://...', el_name: 'social_facebook', is_toggled: true,
     * undeletable: false}
     */
    renderListItems: async function (previewMode, value, params) {
        // This receive data from we-list widget and will update the target.
        const entries = JSON.parse(value);
        const newDBLinks = [];
        // Handle element deletation.
        const anchorsEls = this.$target[0].querySelectorAll('a[data-social-id]');
        if (entries.length < anchorsEls.length) {
            const existingSocialIds = entries.map(entry => entry.el_name);
            for (let i = 0; i < anchorsEls.length; i++) {
                const socialId = anchorsEls[i].dataset.socialId;
                if (!existingSocialIds.includes(socialId)) {
                    console.log('[SocialMedia] Removing anchorEl: ', anchorsEls[i]);
                    anchorsEls[i].remove();
                    break;
                }
            }
        }
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (!entry.el_name) {
                break; // It happens when you move a link that you are editing.
            }
            const anchorEl = this.$target[0].querySelector(`[data-social-id="${entry.el_name}"]`);
            if (!anchorEl) {
                console.log('[SocialMedia] Create a new anchorEl: ', entry.el_name);
                // Tests favicon matching.
                {
                console.log('*****Test****');
                console.log('***Youtube:');
                console.log(this.findTheMoreAccurateIcon("https://youtu.be/i8hHlexFtN0"));
                console.log(this.findTheMoreAccurateIcon("https://www.youtube.com/channel/UCkQPikELWZFLgQNHd73jkdg"));
                console.log(this.findTheMoreAccurateIcon("https://www.youtube.com/user/Odoo"));
                console.log(this.findTheMoreAccurateIcon("https://www.youtube.com/watch?v=IS2tAkl4C2g"));
                console.log('***Instagram:');
                console.log(this.findTheMoreAccurateIcon("https://www.instagram.com/odoo.official/"));
                console.log(this.findTheMoreAccurateIcon("https://www.instagram.com/useId?v=dQw4w9WgXcQ"));
                console.log(this.findTheMoreAccurateIcon("https://www.istgm.com/useId?v=dQw4w9WgXcQ"));
                console.log("***Twitter:")
                console.log(this.findTheMoreAccurateIcon("https://www.twitter.com/useId?v=dQw4w9WgXcQ"));
                console.log("***Linkedin:")
                console.log(this.findTheMoreAccurateIcon("https://www.linkedin.com/posts/catherine-vieslet-1281aa14_business-analyst-odoo-activity-6871424528891830273-BMRH"));
                console.log("***Github:")
                console.log(this.findTheMoreAccurateIcon("https://github.com/odoo/odoo"));
                console.log("***Facebook:")
                console.log(this.findTheMoreAccurateIcon("https://www.facebook.com/odoo"));
                }
                // End tests
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
                // TODO search an amazing fa-icon that match the url.
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
    findTheMoreAccurateIcon(url) {
        // const icon = url.match(/^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|twitter\.com|youtube\.com|instagram\.com|linkedin\.com|github\.com)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/);
        const supportedSocialMedia = ['facebook', 'twitter', 'youtube', 'instagram', 'linkedin', 'github'];
        let moreAccurateSocialMedia = '';
        let scoreOfMoreAccurateSocialMedia = 0;
        for (let i = 0; i < supportedSocialMedia.length; i++) {
            // TODO remove after .com/ data
            url = url.match(/^https?:\/\/[^#?\/]+/)[0];
            const score = this.similarity(url, `https://www.${supportedSocialMedia[i]}.com`);
            if (score > scoreOfMoreAccurateSocialMedia) {
                scoreOfMoreAccurateSocialMedia = score;
                moreAccurateSocialMedia = supportedSocialMedia[i];
            }
        }
        return `fa-${moreAccurateSocialMedia}`;
    },
    // https://en.wikipedia.org/wiki/Levenshtein_distance
    similarity(s1, s2) {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        const longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    },
    editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        let costs = new Array();
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0) {
                costs[s2.length] = lastValue;
            }
        }
        return costs[s2.length];
    },
});

export default {
    SocialMedia: options.registry.SocialMedia,
};
