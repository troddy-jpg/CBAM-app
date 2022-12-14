<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
 

export default {
  auth0: useAuth0,
  name: 'HomeView',
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
    };
  },
  components: {
    HelloWorld
  },
  mounted() {
    if (this.isAuthenticated) {
      console.log("logged in!!!")
      axios
        .post(("http://localhost:5000/users"), {email: this.user.email, password: "default"})
        .catch(error => {
          console.log("Got an error posting user"+error)
          this.errored = true
        })
    }
  },
}
</script>
