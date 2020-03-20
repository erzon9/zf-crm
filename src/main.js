import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './assets/js/axios.defaults';
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Form,
  FormItem,
  Input,
  Notification,
  MessageBox,
  Select,
  Option,
  Table,
  TableColumn
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';


Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$http = axios;
Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')