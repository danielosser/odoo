/** @odoo-module **/
import { WebClient } from "../../webclient/webclient";
import { EnterpriseNavBar } from "./navbar/navbar";
const { hooks } = owl;
import { useService } from "../../core/hooks";
export class WebClientEnterprise extends WebClient {
  constructor() {
    super(...arguments);
    this.hm = useService("home_menu");
    hooks.onMounted(() => {
      this.env.bus.on("HOME-MENU:TOGGLED", this, () => {
        if (!this.el) {
          return;
        }
        this.el.classList.toggle("o_home_menu_background", this.hm.hasHomeMenu);
        this.el.classList.toggle("o_has_home_menu", this.hm.hasHomeMenu);
      });
    });
  }
  async _routerStateLoaded() {
    await super.loadRouterState(...arguments);
    return this.hm.toggle(false, false);
  }
  _loadDefaultApp() {
    return this.hm.toggle(true);
  }
}
WebClientEnterprise.template = "wowlent.WebClientEnterprise";
WebClientEnterprise.components = { ...WebClient.components, EnterpriseNavBar };
