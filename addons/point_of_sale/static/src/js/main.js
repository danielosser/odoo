/** @odoo-module */

import { startWebClient } from "@web/setup";

import { ChromeAdapter } from "@point_of_sale/js/chrome_adapter";
import Registries from "point_of_sale.Registries";

class PosApp extends owl.Component {
  setup() {
    owl.hooks.onMounted(() => {
      this.env.bus.trigger("WEB_CLIENT_READY");
    });
  }
}
PosApp.template = owl.tags.xml`
  <body>
    <ChromeAdapter />
  </body>
`;
PosApp.components = { ChromeAdapter };

function startPosApp() {
  Registries.Component.add(owl.misc.Portal);
  Registries.Component.freeze();
  startWebClient(PosApp);
}

startPosApp();
