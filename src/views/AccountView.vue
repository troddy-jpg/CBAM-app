<template>
    <div v-if="isLoading">Loading ...</div>
    <div v-else>
        <h2>User Profile</h2>
        <pre v-if="isAuthenticated">
        <code>{{ user }}</code>
        <code>{{ CBAMuser }}</code>
      </pre>
    </div>
    <h1>Essays</h1>
    <div v-for="essay in this.essays" :key="essay.id">
        <button @click="this.deleteEssay(essay.id)">Delete</button>
        <label>{{essay.title}}</label>
    </div>
    <h1>Comments</h1>
    <div v-for="comment in this.comments" :key="comment.id">
        <div v-if="(comment.user_email === this.user.email)">
        <button>edit me</button>
        <button @click="this.deleteComment(comment.id)">delete me</button>
        <input v-model="this.newCommentContent" placeholder="new comment" />
        <label>{{comment.content}}</label>
    </div>
    </div>
    <button @click="this.deleteUser()">delete user</button>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';


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
            CBAMuser: {},
            essays: [],
            comments: [],
            newCommentContent:"",
        }
    },
    methods: {
        getUser() {
            axios
                .get(("http://localhost:5000/user/" + this.user.email))
                .then(response => {
                    console.log(response.data)
                    this.CBAMuser = response.data
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    this.getOwnedEssays()
                    this.getOwnedComments()
                })
        },
        getOwnedEssays() {
            axios
                .get(("http://localhost:5000/user/" + this.user.email + '/essays'))
                .then(response => {
                    console.log(response.data)
                    this.essays = response.data
                })
        },
        getOwnedComments() {
            axios
                .get('http://localhost:5000/comments', { user_email: this.user.email })
                .then(response => {
                    console.log(response.data)
                    this.comments = response.data
                })
        },
        deleteComment(id) {
            axios
                .delete('http://localhost:5000/comment/' + id,)
                .then(response => {
                    console.log(response.data)
                    this.comments = response.data
                })
                .finally(() => {
                    this.getOwnedComments()
                })
        },
        deleteEssay(id) {
            axios
                .delete('http://localhost:5000/essay/' + id,)
                .then(response => {
                    console.log(response.data)
                    this.comments = response.data
                })
                .finally(() => {
                    this.getOwnedEssays()
                })
        },
        deleteUser() {
            axios
                .delete('http://localhost:5000/user/' + this.user.email,)
                .then(response => {
                    console.log(response.data)
                    this.comments = response.data
                })
                .finally(() => {
                    this.getOwnedEssays()
                })
        },
    },
    mounted() {
        this.getUser()
    },
}
</script>
