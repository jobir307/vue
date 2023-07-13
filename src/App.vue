<template>
    <div class="app">
        <h2>Страница с постами</h2>
        <div class="app_btns">
            <my-button
                @click="showDialog"
            >
                Создать новый пост
            </my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
                @create="createPost"
            />
        </my-dialog>
        <post-list 
            :posts="posts"
            @delete="deletePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идёт загрузка</div>
    </div>    
</template>

<script>
import PostList from '@/components/PostList'
import PostForm from '@/components/PostForm'
import axios from 'axios'

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false
        },
        deletePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        eventTitle(event){
            this.title = event.target.value
        },
        showDialog() {
            this.dialogVisible = true
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
                    this.posts = response.data
                    this.isPostsLoading = false
                }, 1200);
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.fetchPosts()
    },
    watch: {
        selectedSort(newValue) {
            this.posts.sort((post1, post2) => {
                console.log(post1)
                return post1[newValue].localeCompare(post2[newValue])
            })
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

.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
</style>