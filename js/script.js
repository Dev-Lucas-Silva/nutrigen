import * as initForm from "./modules/init-form.js";
import MenuMobile from './modules/menu-mobile.js';
import { initHistoryApi } from "./modules/history-api.js";
import NavDieta from "./modules/nav-app-dieta.js"

initForm.init();

const menuMobile = new MenuMobile('[data-menu="button"]', '[data-menu="list"]');
menuMobile.init();

initHistoryApi();

const navDieta = NavDieta('.menu-dieta button', '.calculadora-container .navDiv');
navDieta.init();

