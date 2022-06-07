var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  install: () => install,
  version: () => version
});
module.exports = __toCommonJS(stdin_exports);
var import_action_bar = require("./action-bar");
var import_action_bar_button = require("./action-bar-button");
var import_action_bar_icon = require("./action-bar-icon");
var import_action_sheet = require("./action-sheet");
var import_address_edit = require("./address-edit");
var import_address_list = require("./address-list");
var import_area = require("./area");
var import_badge = require("./badge");
var import_button = require("./button");
var import_calendar = require("./calendar");
var import_card = require("./card");
var import_cascader = require("./cascader");
var import_cell = require("./cell");
var import_cell_group = require("./cell-group");
var import_checkbox = require("./checkbox");
var import_checkbox_group = require("./checkbox-group");
var import_circle = require("./circle");
var import_col = require("./col");
var import_collapse = require("./collapse");
var import_collapse_item = require("./collapse-item");
var import_config_provider = require("./config-provider");
var import_contact_card = require("./contact-card");
var import_contact_edit = require("./contact-edit");
var import_contact_list = require("./contact-list");
var import_count_down = require("./count-down");
var import_coupon = require("./coupon");
var import_coupon_cell = require("./coupon-cell");
var import_coupon_list = require("./coupon-list");
var import_datetime_picker = require("./datetime-picker");
var import_dialog = require("./dialog");
var import_divider = require("./divider");
var import_dropdown_item = require("./dropdown-item");
var import_dropdown_menu = require("./dropdown-menu");
var import_empty = require("./empty");
var import_field = require("./field");
var import_form = require("./form");
var import_grid = require("./grid");
var import_grid_item = require("./grid-item");
var import_icon = require("./icon");
var import_image = require("./image");
var import_image_preview = require("./image-preview");
var import_index_anchor = require("./index-anchor");
var import_index_bar = require("./index-bar");
var import_list = require("./list");
var import_loading = require("./loading");
var import_locale = require("./locale");
var import_nav_bar = require("./nav-bar");
var import_notice_bar = require("./notice-bar");
var import_notify = require("./notify");
var import_number_keyboard = require("./number-keyboard");
var import_overlay = require("./overlay");
var import_pagination = require("./pagination");
var import_password_input = require("./password-input");
var import_picker = require("./picker");
var import_popover = require("./popover");
var import_popup = require("./popup");
var import_progress = require("./progress");
var import_pull_refresh = require("./pull-refresh");
var import_radio = require("./radio");
var import_radio_group = require("./radio-group");
var import_rate = require("./rate");
var import_row = require("./row");
var import_search = require("./search");
var import_share_sheet = require("./share-sheet");
var import_sidebar = require("./sidebar");
var import_sidebar_item = require("./sidebar-item");
var import_skeleton = require("./skeleton");
var import_slider = require("./slider");
var import_step = require("./step");
var import_stepper = require("./stepper");
var import_steps = require("./steps");
var import_sticky = require("./sticky");
var import_submit_bar = require("./submit-bar");
var import_swipe = require("./swipe");
var import_swipe_cell = require("./swipe-cell");
var import_swipe_item = require("./swipe-item");
var import_switch = require("./switch");
var import_tab = require("./tab");
var import_tabbar = require("./tabbar");
var import_tabbar_item = require("./tabbar-item");
var import_tabs = require("./tabs");
var import_tag = require("./tag");
var import_toast = require("./toast");
var import_tree_select = require("./tree-select");
var import_uploader = require("./uploader");
__reExport(stdin_exports, require("./action-bar"), module.exports);
__reExport(stdin_exports, require("./action-bar-button"), module.exports);
__reExport(stdin_exports, require("./action-bar-icon"), module.exports);
__reExport(stdin_exports, require("./action-sheet"), module.exports);
__reExport(stdin_exports, require("./address-edit"), module.exports);
__reExport(stdin_exports, require("./address-list"), module.exports);
__reExport(stdin_exports, require("./area"), module.exports);
__reExport(stdin_exports, require("./badge"), module.exports);
__reExport(stdin_exports, require("./button"), module.exports);
__reExport(stdin_exports, require("./calendar"), module.exports);
__reExport(stdin_exports, require("./card"), module.exports);
__reExport(stdin_exports, require("./cascader"), module.exports);
__reExport(stdin_exports, require("./cell"), module.exports);
__reExport(stdin_exports, require("./cell-group"), module.exports);
__reExport(stdin_exports, require("./checkbox"), module.exports);
__reExport(stdin_exports, require("./checkbox-group"), module.exports);
__reExport(stdin_exports, require("./circle"), module.exports);
__reExport(stdin_exports, require("./col"), module.exports);
__reExport(stdin_exports, require("./collapse"), module.exports);
__reExport(stdin_exports, require("./collapse-item"), module.exports);
__reExport(stdin_exports, require("./config-provider"), module.exports);
__reExport(stdin_exports, require("./contact-card"), module.exports);
__reExport(stdin_exports, require("./contact-edit"), module.exports);
__reExport(stdin_exports, require("./contact-list"), module.exports);
__reExport(stdin_exports, require("./count-down"), module.exports);
__reExport(stdin_exports, require("./coupon"), module.exports);
__reExport(stdin_exports, require("./coupon-cell"), module.exports);
__reExport(stdin_exports, require("./coupon-list"), module.exports);
__reExport(stdin_exports, require("./datetime-picker"), module.exports);
__reExport(stdin_exports, require("./dialog"), module.exports);
__reExport(stdin_exports, require("./divider"), module.exports);
__reExport(stdin_exports, require("./dropdown-item"), module.exports);
__reExport(stdin_exports, require("./dropdown-menu"), module.exports);
__reExport(stdin_exports, require("./empty"), module.exports);
__reExport(stdin_exports, require("./field"), module.exports);
__reExport(stdin_exports, require("./form"), module.exports);
__reExport(stdin_exports, require("./grid"), module.exports);
__reExport(stdin_exports, require("./grid-item"), module.exports);
__reExport(stdin_exports, require("./icon"), module.exports);
__reExport(stdin_exports, require("./image"), module.exports);
__reExport(stdin_exports, require("./image-preview"), module.exports);
__reExport(stdin_exports, require("./index-anchor"), module.exports);
__reExport(stdin_exports, require("./index-bar"), module.exports);
__reExport(stdin_exports, require("./lazyload"), module.exports);
__reExport(stdin_exports, require("./list"), module.exports);
__reExport(stdin_exports, require("./loading"), module.exports);
__reExport(stdin_exports, require("./locale"), module.exports);
__reExport(stdin_exports, require("./nav-bar"), module.exports);
__reExport(stdin_exports, require("./notice-bar"), module.exports);
__reExport(stdin_exports, require("./notify"), module.exports);
__reExport(stdin_exports, require("./number-keyboard"), module.exports);
__reExport(stdin_exports, require("./overlay"), module.exports);
__reExport(stdin_exports, require("./pagination"), module.exports);
__reExport(stdin_exports, require("./password-input"), module.exports);
__reExport(stdin_exports, require("./picker"), module.exports);
__reExport(stdin_exports, require("./popover"), module.exports);
__reExport(stdin_exports, require("./popup"), module.exports);
__reExport(stdin_exports, require("./progress"), module.exports);
__reExport(stdin_exports, require("./pull-refresh"), module.exports);
__reExport(stdin_exports, require("./radio"), module.exports);
__reExport(stdin_exports, require("./radio-group"), module.exports);
__reExport(stdin_exports, require("./rate"), module.exports);
__reExport(stdin_exports, require("./row"), module.exports);
__reExport(stdin_exports, require("./search"), module.exports);
__reExport(stdin_exports, require("./share-sheet"), module.exports);
__reExport(stdin_exports, require("./sidebar"), module.exports);
__reExport(stdin_exports, require("./sidebar-item"), module.exports);
__reExport(stdin_exports, require("./skeleton"), module.exports);
__reExport(stdin_exports, require("./slider"), module.exports);
__reExport(stdin_exports, require("./step"), module.exports);
__reExport(stdin_exports, require("./stepper"), module.exports);
__reExport(stdin_exports, require("./steps"), module.exports);
__reExport(stdin_exports, require("./sticky"), module.exports);
__reExport(stdin_exports, require("./submit-bar"), module.exports);
__reExport(stdin_exports, require("./swipe"), module.exports);
__reExport(stdin_exports, require("./swipe-cell"), module.exports);
__reExport(stdin_exports, require("./swipe-item"), module.exports);
__reExport(stdin_exports, require("./switch"), module.exports);
__reExport(stdin_exports, require("./tab"), module.exports);
__reExport(stdin_exports, require("./tabbar"), module.exports);
__reExport(stdin_exports, require("./tabbar-item"), module.exports);
__reExport(stdin_exports, require("./tabs"), module.exports);
__reExport(stdin_exports, require("./tag"), module.exports);
__reExport(stdin_exports, require("./toast"), module.exports);
__reExport(stdin_exports, require("./tree-select"), module.exports);
__reExport(stdin_exports, require("./uploader"), module.exports);
const version = "3.4.8";
function install(app) {
  const components = [
    import_action_bar.ActionBar,
    import_action_bar_button.ActionBarButton,
    import_action_bar_icon.ActionBarIcon,
    import_action_sheet.ActionSheet,
    import_address_edit.AddressEdit,
    import_address_list.AddressList,
    import_area.Area,
    import_badge.Badge,
    import_button.Button,
    import_calendar.Calendar,
    import_card.Card,
    import_cascader.Cascader,
    import_cell.Cell,
    import_cell_group.CellGroup,
    import_checkbox.Checkbox,
    import_checkbox_group.CheckboxGroup,
    import_circle.Circle,
    import_col.Col,
    import_collapse.Collapse,
    import_collapse_item.CollapseItem,
    import_config_provider.ConfigProvider,
    import_contact_card.ContactCard,
    import_contact_edit.ContactEdit,
    import_contact_list.ContactList,
    import_count_down.CountDown,
    import_coupon.Coupon,
    import_coupon_cell.CouponCell,
    import_coupon_list.CouponList,
    import_datetime_picker.DatetimePicker,
    import_dialog.Dialog,
    import_divider.Divider,
    import_dropdown_item.DropdownItem,
    import_dropdown_menu.DropdownMenu,
    import_empty.Empty,
    import_field.Field,
    import_form.Form,
    import_grid.Grid,
    import_grid_item.GridItem,
    import_icon.Icon,
    import_image.Image,
    import_image_preview.ImagePreview,
    import_index_anchor.IndexAnchor,
    import_index_bar.IndexBar,
    import_list.List,
    import_loading.Loading,
    import_locale.Locale,
    import_nav_bar.NavBar,
    import_notice_bar.NoticeBar,
    import_notify.Notify,
    import_number_keyboard.NumberKeyboard,
    import_overlay.Overlay,
    import_pagination.Pagination,
    import_password_input.PasswordInput,
    import_picker.Picker,
    import_popover.Popover,
    import_popup.Popup,
    import_progress.Progress,
    import_pull_refresh.PullRefresh,
    import_radio.Radio,
    import_radio_group.RadioGroup,
    import_rate.Rate,
    import_row.Row,
    import_search.Search,
    import_share_sheet.ShareSheet,
    import_sidebar.Sidebar,
    import_sidebar_item.SidebarItem,
    import_skeleton.Skeleton,
    import_slider.Slider,
    import_step.Step,
    import_stepper.Stepper,
    import_steps.Steps,
    import_sticky.Sticky,
    import_submit_bar.SubmitBar,
    import_swipe.Swipe,
    import_swipe_cell.SwipeCell,
    import_swipe_item.SwipeItem,
    import_switch.Switch,
    import_tab.Tab,
    import_tabbar.Tabbar,
    import_tabbar_item.TabbarItem,
    import_tabs.Tabs,
    import_tag.Tag,
    import_toast.Toast,
    import_tree_select.TreeSelect,
    import_uploader.Uploader
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var stdin_default = {
  install,
  version
};