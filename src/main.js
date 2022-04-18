import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(VModal, {
  dialog: true,
  dynamicDefaults: {
    draggable: true
  }
})

Vue.config.productionTip = false
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import '@/assets/css/normalize.css'
import '@/assets/css/skeleton.css'
import '@/assets/css/style.css'
import 'vue-select/dist/vue-select.css';

new Vue({
  render: h => h(App),
}).$mount('#app')
