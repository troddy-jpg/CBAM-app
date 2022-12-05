<template>
    <div class="essays">
        <h1>Essays section</h1>
        <div v-for="(essay) in essays" :key="essay.id">
            <span>Id: </span>
            <label>{{ essay.id }}, </label>
            <span>Title: </span>
            <label>{{ essay.title }}, </label>
            <span>Revision: </span>
            <label>{{ essay.revision }}, </label>
            <span>Format: </span>
            <label>{{ essay.format }}, </label>
            <span>Modified: </span>
            <label>{{ essay.date_modified }}, </label>
            <button @click="postEssay(essay.id,essay.title,essay.content,true)">Delete Essay</button>
        </div>
        <div>
            <input v-model="newEssayTitle" placeholder="Title of new essay" />
            <input v-model="newEssayContent" placeholder="Content of new essay" />
            <button @click="postEssay(-1,newEssayTitle,newEssayContent,false)">Post new essay</button>
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
                { id: -1, user_id: -1, title: "", content: "", revision: -1, format: "", date_modified: "" },
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
        axios
            this.reloadEssays()
    },
    methods: {
        postEssay(id= -1, title="",content="",toDelete=false) {
            axios
                .post('http://localhost:5000/essay_db', {
                    id: id,
                    user_id: 1,//this.user.email,
                    title: title,
                    content: content,
                    delete: toDelete
                })
                .then((response)=> {
                    console.log(response);
                })
                .finally(()=> this.reloadEssays())
        },
        reloadEssays() {
            this.loading = true
            axios
                .get('http://localhost:5000/essay_db')
                .then(response => (this.essays = response.data))
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
                
        }
    }
}
</script>
