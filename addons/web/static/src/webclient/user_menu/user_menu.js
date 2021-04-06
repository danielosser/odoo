/** @odoo-module **/

import { useService } from "../../core/hooks";
import { systrayRegistry } from "../systray_registry";
import { browser } from "../../core/browser";

const { Component } = owl;

export class UserMenu extends Component {
  static isDisplayed(env) {
    return !env.isSmall;
  }

  setup() {
    this.user = useService("user");
    const { origin } = browser.location;
    const { userId } = this.user;
    this.source = `${origin}/web/image?model=res.users&field=image_128&id=${userId}`;
  }

  getElements() {
    const sortedItems = odoo.userMenuRegistry.getAll()
      .map((element) => element(this.env));
    return sortedItems;
  }

  onDropdownItemSelected(ev) {
    ev.detail.payload.callback();
  }

  onClickOnTagA(ev) {
    if (!ev.ctrlKey) {
      ev.preventDefault();
    }
  }
}
UserMenu.template = "web.UserMenu";

systrayRegistry.add("web.user_menu", UserMenu, { sequence: 0 });
