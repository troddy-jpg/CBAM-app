<template>
    <div class="comments">
        <input v-model="this.searchTerm" placeholder="Search by essay content," />
        <button @click="this.searchEssays()">search essays</button>

        <div v-for="essay in this.returnedEssays" :key="essay.id">
            <span @click="singleEssay(essay.id)">
                <label>'{{ essay.title }}'</label>
                <span> By </span>
                <label>{{ essay.user }}</label>
                <span> V. </span>
                <label>{{ essay.revision }}</label>
            </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'SearchView',
    data() {
        return {
            returnedEssays: [],
            searchTerm:"",
        }
    },
    components: {
        
    },
    methods: {
        searchEssays() {
            axios
                .get('http://localhost:5000/essaytitle/' + this.searchTerm)
                .then(response => {
                    console.log("returnedEssays")
                    console.log(response.data)
                    this.returnedEssays = response.data
                })

        },
        singleEssay(id) {
            this.$router.push('/essay/' + id)
        },
    },
}
</script>
