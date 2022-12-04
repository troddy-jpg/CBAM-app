<template>
    <div id="essays-vue">
        <div>
            <div v-for="(essay) in essays" :key="essay.id">
                <label>{{essay.id}}.</label>
            </div>
        </div>
    </div>
</template>

<script>

export default({
    name: "essay_comp",
    data: function () {
        return {
            essays: [
                { id: -1, user_id: -1, title: "", content: "", revision: -1},
            ],
        };
    },
})
</script>
