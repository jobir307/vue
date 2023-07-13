<template>
    <div>
        <h3>Список постов</h3>
        <post-item 
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @delete="this.$emit('delete', post)"
        /> 
    </div>
</template>

<script>
import PostItem from '@/components/PostItem';
    export default {
        props: {
            posts: {
                type: Array,
                required: true
            }
        },
        components: {
            PostItem
        }
    }
</script>

<style scoped>

</style>