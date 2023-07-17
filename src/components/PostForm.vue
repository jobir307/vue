<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input 
            v-model="post.title"
            type="text" 
            placeholder="Название"
            style="margin-top: 15px;"
            v-focus
         />
        <my-input 
            v-model="post.body"
            type="text" 
            placeholder="Описание"
            style="margin-top: 15px;"
        />
        <my-button 
            @click="createPost"
            style="align-self: flex-end; margin-top: 15px;"
        >
            Добавить новый пост
        </my-button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createPost() {
                if (this.post.title != '' && this.post.body != '') {
                    this.post.id=Date.now()
                    this.$emit('create', this.post)
                    this.post = {
                        title: '',
                        body: ''
                    }
                }
            }
        }
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }
</style>