<template>
    <div v-if="isLoading">Loading ...</div>
    <div v-else>
        <h2>User Profile</h2>
        <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
      </pre>
    </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';


export default {
    auth0: useAuth0,
    name: 'AccountView',
    components: {
        
    },
    data() {
        return {
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            isLoading: this.$auth0.isLoading,
        }
    }
}
</script>
