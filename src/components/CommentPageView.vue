<template>
    <input v-model="newCommentContent" placeholder="new comment" />
    <button @click="newComment()">Post comment</button>
    <div v-for="(comment) in comments" :key="comment.id" >
            <label v-if="(comment.sentence === myLine)">'{{ comment.sentence }}'</label>
            <label>'{{ comment.content }}'</label>
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
            newCommentContent: "",
            comments: [ { sentence:-1}],
            loading: true,
            errored: false,
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated,
            filteredComments: [{}],
            myLine: this.$route.params.line,
        }
    },
    mounted() {
        this.loadComments()
        this.filterComments()
    },
    methods: {
        loadComments() {
            this.loading = true
            axios
                .get('http://localhost:5000/essay/' + this.$route.params.id + '/comments', {email: this.user.email})
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
                })
        },
        filterComments() {
           this.filteredComments = this.comments.filter(comment => comment.sentence === this.$route.params.line)
        },
        newComment() {
            // id(int): The id of the comment.
            //     essay_id(int): The id of the essay the comment is on.
            //         user_email(str): The email of the user who posted the comment.
            //             content(str): The content of the comment.
            //                 created_at(datetime): The timestamp the comment was created.
            //                     sentences(list): The sentences the comment spans.Mutually exclusive with word.
            //                         sentence(int): The sentence the comment starts on.
            //                             word(int): The word the comment is on.Mutually exclusive with sentences.
            axios
                .post('http://localhost:5000/comments', { essay_id: this.$route.params.id, user_email: this.user.email, content: this.newCommentContent, sentence:  this.$route.params.line  })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    this.loadComments()
                })
        }
    }
}
</script>