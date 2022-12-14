<template>
    <h1>{{this.essay.title}}</h1>
    <i>modified {{this.essay.date_modified}}, created {{this.essay.date_created}}, revision {{(this.essay.revision + 1)}}</i>
    <div v-if="!this.editMode">
        <span v-for="(line, index) in this.essayLines" :key="index">
            <span @click="(selectedLine = index)">{{line}}.</span>
        </span>
    </div>
    <div v-if="this.editMode">
        <input v-model="this.newEssayTitle" placeholder="Paste new essay title" />
        <input v-model="this.newEssayContent" placeholder="Past new essay content"/>
        <button @click="this.rePostEssay()">Post Revision</button>
    </div>
    <i v-if="!this.isOwner">Essay by {{essay.user_email}}</i>
    <div v-if="this.isOwner">
        <button @click="(this.editMode = true)">Edit essay</button>
    </div>
    <h2>Comments</h2>
    <i>Click on a sentence / line to bring up its comments. viewing: </i>
    <div v-if="(selectedLine != -1)">
        <h1>{{selectedLine}}</h1>
        <hr>
        <div v-for="(comment) in this.comments" :key="comment.sentence">
            <div v-if="comment.sentence === this.selectedLine">
                <label>{{ comment.content }}</label>
            </div>
        </div>
        <input v-model="this.newCommentContent" placeholder="new comment" />
        <button @click="this.postComment()">Post comment</button>
    </div>
</template>

<script>
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue';


export default {
    auth0: useAuth0,
    name: 'SingleEssayView',
    data() {
        return {
            essay: { title: "", content:"", user_email:""},
            loading: true,
            errored: false,
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            isOwner: false,
            essayLines: {},
            selectedLine: -1,
            newCommentContent: "",
            editMode: false,
            newEssayTitle:"",
            newEssayContent:"",
        }
    },
    mounted() {
        this.loadEssay()
    },
    methods: {
        loadEssay() {
            this.loading = true
            axios
                .get('http://localhost:5000/essay/' + this.$route.params.id)
                .then(response => {
                    console.log(response.data)
                    this.essay = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                    this.parseContent()
                    this.checkOwnership()
                    this.loadComments()
                })
        },
        checkOwnership() {
            this.isOwner = this.essay.user_email === this.user.email
            console.log(this.isOwner)
        },
        parseContent() {
            this.essayLines = this.essay.content.split(".")
            console.log(this.essayLines)
        },
        // openCommentsOnLine(lineNumber) {
        //     console.log(lineNumber)
        //     this.$router.push('/essay/' + this.essay.id+"/" + lineNumber)
        // },
        loadComments() {
            this.loading = true
            axios
                .get('http://localhost:5000/essay/' + this.$route.params.id + '/comments', { email: this.user.email })
                .then(response => {
                    console.log(response.data)
                    this.comments = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                    this.$forceUpdate
                })
        },
        postComment() {
            axios
                .post('http://localhost:5000/comments', { essay_id: this.$route.params.id, user_email: this.user.email, content: this.newCommentContent, sentence: this.selectedLine })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    console.log("finally")
                    this.loadEssay()
                })
        },
        // editComment(commentId) {
        //     axios
        //         .put('http://localhost:5000/comments', { id:commentId, essay_id: this.$route.params.id, user_email: this.user.email, content: this.newCommentContent, sentence: this.selectedLine })
        //         .then(response => {
        //             console.log(response.data)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //         .finally(() => {
        //             console.log("finally")
        //             this.loadEssay()
        //         })
        // },
        rePostEssay() {
            if (!this.isAuthenticated || !this.isOwner)
                return//don't post if not authenticated
            axios
                .put(('http://localhost:5000/essay/' + this.$route.params.id), {
                    email: this.user.email,
                    title: this.newEssayTitle,
                    content: this.newEssayContent,
                    increment_revision: true,
                })
                .then((response) => {
                    console.log(response);
                })
                .finally(() => {
                    this.loadEssay()
                    this.editMode = false
                })
        },
    }
}
</script>