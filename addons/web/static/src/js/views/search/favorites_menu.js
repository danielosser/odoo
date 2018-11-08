odoo.define('web.FavoritesMenu', function (require) {
"use strict";

var config = require('web.config');
var core = require('web.core');
var DropdownMenu = require('web.DropdownMenu');
var favorites_submenus_registry = require('web.favorites_submenus_registry');

var _t = core._t;

var FavoritesMenu = DropdownMenu.extend({
    /*
     * override
     *
     * @param {Widget} parent
     * @param {Object[]} favorites
     */
    init: function (parent, favorites) {
        this._super(parent, favorites);
        this.isMobile = config.device.isMobile;
        this.dropdownCategory = 'favorite';
        this.dropdownTitle = _t('Favorites');
        this.dropdownIcon = 'fa fa-star';
        this.dropdownSymbol = this.isMobile ? 'fa fa-chevron-right float-right mt4' : false;
        this.dropdownStyle.mainButton.class = 'o_favorites_menu_button ' +
                                                this.dropdownStyle.mainButton.class;

    },
    /**
     * render the template used to register a new favorite and append it
     * to the basic dropdown menu
     *
     * @private
     */
    start: function () {
        var self = this;
        var params = {
            favorites: this.items,
        };
        this.$menu = this.$('.o_dropdown_menu');
        this.$menu.addClass('o_favorites_menu');
        this.subMenus = [];
        favorites_submenus_registry.values().forEach(function (SubMenu) {
            var subMenu = new SubMenu(self, params);
            subMenu.appendTo(self.$menu);
            self.subMenus.push(subMenu);
        });
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     */
     _closeSubMenus: function () {
        this.subMenus.forEach(function (subMenu) {
            subMenu.closeMenu();
        });
     },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /*
     * override
     *
     * @private
     * @param {jQueryEvent} event
     */
    _onBootstrapClose: function () {
        this._super.apply(this, arguments);
        this._closeSubMenus();
    },
    /*
     * override
     *
     * @private
     * @param {jQueryEvent} event
     */
    _onTrashButtonClick: function (event) {
        event.preventDefault();
        event.stopPropagation();
        var id = $(event.currentTarget).data('id');
        var favorite = this.items.find(function (favorite) {
            return favorite.id === id;
        });
        var globalWarning = _t("This filter is global and will be removed for everybody if you continue.");
        var warning = _t("Are you sure that you want to remove this filter?");
        if (!confirm(favorite.userId ? warning : globalWarning)) {
            return;
        }
        this.trigger_up('item_trashed', {id: id});
    },
});

return FavoritesMenu;

});