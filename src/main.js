import { createApp } from "vue";
import App from "./App.vue";

import "primeflex/primeflex.css";
import "primevue/resources/themes/vela-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import Toolbar from "primevue/toolbar";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Badge from "primevue/badge";
import Tag from "primevue/tag";
import DataView from "primevue/dataview";
import Dropdown from "primevue/dropdown";
import Sidebar from "primevue/sidebar";

const app = createApp(App);

app.use(PrimeVue, { ripple: false });
app.directive("tooltip", Tooltip);
app.component("Toolbar", Toolbar);
app.component("RadioButton", RadioButton);
app.component("Button", Button);
app.component("Chip", Chip);
app.component("Badge", Badge);
app.component("Tag", Tag);
app.component("DataView", DataView);
app.component("Dropdown", Dropdown);
app.component("Sidebar", Sidebar);
app.mount("#app");
