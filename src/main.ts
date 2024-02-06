import { createApp } from "vue";
import { createPinia } from "pinia";
import BootstrapVue3 from "bootstrap-vue-3";
import Maska from "maska";
import { createHead } from "@vueuse/head";
import DatePicker from "ant-design-vue";
// import * as EvaIcons from "@stefandesu/eva-icons-vue";
// import vClickOutside from "click-outside-vue3";

import i18n from "./plugins/i18n";
import router from "./router";

import App from "./App.vue";

import "sweetalert2/dist/sweetalert2.min.css";
import "./assets/scss/custom/plugins/mermaid.min.css";
import "ant-design-vue/dist/antd.min.css";
import "./assets/scss/app.scss";

// import './assets/main.css'

// const router = createRouter();
export type AppContext = Awaited<ReturnType<typeof createApp>>;
export type Plugin = (vuero: AppContext) => void | Promise<void>;

const head = createHead();
const pinia = createPinia();
const app = createApp(App);

// app.use(vClickOutside);
// app.use(EvaIcons);
app.use(pinia);
app.use(BootstrapVue3);
app.use(Maska);
app.use(DatePicker);
app.use(i18n);
app.use(router);
app.use(head);
app.mount("#app");

// this is a helper function to define plugins with autocompletion
export function definePlugin(plugin: Plugin) {
  return plugin;
}
