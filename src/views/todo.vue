<template>
    <div class="todo">
        <todo_comp />
    </div>
</template>

<script>
// @ is an alias to /src
import todo_comp from '../../src/components/todo-comp.vue'
export default {
    name: 'todoVue',
    components: {
        todo_comp,
    }
}
</script>