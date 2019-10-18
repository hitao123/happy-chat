import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:4000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
