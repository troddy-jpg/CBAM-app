<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/essays">Essays</router-link> |
    <router-link to="/comments">Comments</router-link> |
    <router-link to="/account">Account</router-link> |
    <button @click="login">
      <strong>Sign In</strong>
    </button>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  auth0: useAuth0,
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    }
  }
}

</script>

