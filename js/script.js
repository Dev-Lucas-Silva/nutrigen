import * as initForm from "./modules/init-form.js";
import MenuMobile from './modules/menu-mobile.js';
import { initHistoryApi } from "./modules/history-api.js";

initForm.init();

const menuMobile = new MenuMobile('[data-menu="button"]', '[data-menu="list"]');
menuMobile.init();

initHistoryApi();
