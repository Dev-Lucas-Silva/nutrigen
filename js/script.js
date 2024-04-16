import * as initForm from "./modules/init-form.js";
import MenuMobile from './modules/menu-mobile.js';
initForm.init();

const menuMobile = new MenuMobile('[data-menu="button"]', '[data-menu="list"]');
menuMobile.init();