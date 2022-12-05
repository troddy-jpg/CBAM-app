<template>
    <div>Essay {{ $route.params.id }}</div>
</template>

<script>
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    auth0: useAuth0,
    name: 'SingleEssayView',
    data() {
        return {
            essays: [
                { id: -1, user_id: -1, title: "", content: "", revision: -1, format: "", date_modified: "" },
            ],
            essay: null,
            loading: true,
            errored: false,
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
        }
    },
    methods: {
        loadEssays() {
            this.loading = true
            axios
                .get('http://localhost:5000/essay_db')
                .then(response => (this.essays = response.data))
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                    //this.essay = essays[this.$route.params.id]
                })

        },
    }
}
</script>