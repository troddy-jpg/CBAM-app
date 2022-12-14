<template>
    <div class="essays">
        <h1>Essays section</h1>
        <h3>Click an essay to view it</h3>
        <div v-for="(essay) in essays" :key="essay.id" >
            <span @click="singleEssay(essay.id)">
            <label>'{{ essay.title }}'</label>
            <span> By </span>
            <label>{{ essay.user }}</label>
            <span> V. </span>
            <label>{{ essay.revision }}</label>
            </span>
            <button @click="deleteEssay(essay.id)">Delete Essay</button>
        </div>
        <div>
            <input v-model="newEssayTitle" placeholder="Title of new essay" />
            <input v-model="newEssayContent" placeholder="Content of new essay" />
            <button @click="postEssay(newEssayTitle,newEssayContent)">Post new essay</button>
            <button @click="reloadEssays()">refresh essays</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue';


export default {
    auth0: useAuth0,
    name: 'EssaysView',
    components: {
        
    },
    data() {
        return {
            essays: [
                {}//{ id: -1, user_id: -1, title: "", content: "", revision: -1, format: "", date_modified: "" },
            ],
            errored: false,
            loading: true,
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            newEssayTitle: null,
            newEssayContent: null,
        }
    },
    mounted() {
        this.reloadEssays()
    },
    methods: {
        postEssay(title = "", content = "") {
            if (!this.isAuthenticated)
                return//don't post if not authenticated
            axios
                .post(('http://localhost:5000/essays'),{
                    user_email: this.user.email,
                    title: title,
                    content: content,
                })
                .then((response)=> {
                    console.log(response);
                })
                .finally(()=> this.reloadEssays())
        },
        reloadEssays() {
            if (!this.isAuthenticated)
                return//don't make API call if not authenticated
            this.loading = true
            axios
                .get('http://localhost:5000/essays')
                .then(response => (this.essays = response.data))
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
                
        },
        singleEssay(id) {
            this.$router.push('/essay/' + id)
        },
        deleteEssay(id) {
            axios
                .delete('http://localhost:5000/essay/' + id)
                .then((response) => {
                    console.log(response);
                })
                .finally(() => this.reloadEssays())
        }
    }
}
</script>
