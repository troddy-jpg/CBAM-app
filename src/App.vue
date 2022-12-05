<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/essays">Essays</router-link> |
    <router-link to="/comments">Comments</router-link> |
    <router-link to="/account">Account</router-link> |
    <button @click="login" v-if="!isAuthenticated">
      <strong>Sign In</strong>
    </button>
    <span id="signedIn" v-if="isAuthenticated">
      <button @click="logout" >
        <strong>Sign Out</strong>
      </button>
      <span> Logged in as: {{user.email}}</span>
    </span>
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
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({ returnTo: window.location.origin });
    }
  }
}

</script>

