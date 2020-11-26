import { BaseView } from "./base_view";

// class KanbanRecord extends Component {
//   static template = xml`
//     <div class="o_kanban_record">
//       <t t-esc="props.record.display_name"/>
//     </div>
//     `;
// }
// class KanbanRenderer extends Component<KanbanRendererProps, OdooEnv> {
//   static template = xml`
//       <div class="o_kanban_renderer">
//         <t t-foreach="props.records" t-as="record" t-key="record.id">
//           <KanbanRecord record="record" t-on-click="_onClick(record.id)"/>
//         </t>
//       </div>
//     `;
//   static style = css`
//     .o_kanban_renderer {
//       display: flex;
//       flex-wrap: wrap;
//     }
//     .o_kanban_record {
//       border: 1px solid gray;
//       width: 200px;
//       height: 80px;
//       margin: 5px;
//       cursor: pointer;

//       &:hover {
//         background-color: #eee;
//       }
//     }
//   `;
//   static components = { KanbanRecord };
//   am = useService("action_manager");

//   _onClick(id: number) {
//     this.am.switchView("form", { recordId: id, recordIds: this.props.records.map((r) => r.id) });
//   }
// }

// interface KanbanControllerState {
//   records: DBRecord[];
// }

export class KanbanView extends BaseView {
  static display_name = "kanban";
  static icon = "fa-th-large";
  static multiRecord = true;
  static type = "kanban";

  // static components = { ...View.components, Renderer: KanbanRenderer, Pager };
  // cpSubTemplates: ControlPanelSubTemplates = {
  //   ...this.cpSubTemplates,
  //   bottomLeft: "wowl.KanbanView.ControlPanelBottomLeft",
  //   bottomRight: "wowl.KanbanView.ControlPanelBottomRight",
  // };

  // modelService = useService("model");

  // state: KanbanControllerState = useState({
  //   records: [],
  // });
  // pager = usePager("pager", {
  //   limit: 5,
  //   onPagerChanged: this.onPagerChanged.bind(this),
  // });

  // async willStart() {
  //   await super.willStart();
  //   await this._loadRecords({ limit: this.pager.limit, offset: this.pager.currentMinimum - 1 });
  // }

  // async _loadRecords(options: any = {}) {
  //   const domain = this.props.domain;
  //   const context = this.props.context;
  //   const model = this.modelService(this.props.model);
  //   const result = await model.searchRead(domain, ["display_name"], options, context);
  //   this.pager.size = result.length;
  //   this.state.records = result.records;
  // }

  // get rendererProps(): any {
  //   const props: any = super.rendererProps;
  //   props.records = this.state.records;
  //   return props;
  // }

  // onCreate() {
  //   this.am.switchView("form");
  // }

  // async onPagerChanged(currentMinimum: number, limit: number) {
  //   await this._loadRecords({ limit, offset: currentMinimum - 1 });
  //   return {};
  // }
}

// export const KanbanView: BaseView = {
//   Component: KanbanController,
//   Renderer: KanbanRenderer,
// };
