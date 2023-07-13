<template>
    <div class="app">
        <post-form 
            @create="createPost"
        />
        <post-list 
            :posts="posts"
            @delete="deletePost"
        />
    </div>    
</template>

<script>
import PostList from '@/components/PostList'
import PostForm from '@/components/PostForm'

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [
                {id: 1, title: 'Javascript', body: 'Javascript универсалный язык программирования'},
                {id: 2, title: 'Javascript 2', body: 'Javascript универсалный язык программирования 2'},
                {id: 3, title: 'Javascript 3', body: 'Javascript универсалный язык программирования 3'}
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
        },
        deletePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        eventTitle(event){
            this.title = event.target.value
        }
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
</style>