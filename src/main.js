import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App).use(store).use(router).mount('#app')


//Note from Trevor: This is definitely a security issue to have this in an untracked file lmao. dw about it.
app.use(
  createAuth0({
    domain: "dev-iad2xb0dso2kocpi.us.auth0.com",
    client_id: "zHHurvW34IkVP6si4oVEmQNFNQSJKpXA",
    redirect_uri: window.location.origin
  })
);

App.prototype.axios = axios//very unsure if this imports axios everywhere
//^^^ suggested line in the article was Vue.etc instead of App.etc
