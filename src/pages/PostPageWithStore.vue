<template>
    <div>
        <!-- <h2>{{ $store.state.isAuth ? 'Пользователь авторизован' : 'Пользователь неавторизован' }}</h2>
        <h2>{{ $store.getters.doubleLikes }}</h2>
        <div>
            <my-button @click="$store.commit('incrementLikes')">Increment</my-button>
            <my-button @click="$store.commit('decrementLikes')">Decrement</my-button>
        </div> -->
        
        <h2>Страница с постами</h2>
        <my-input 
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск..."
            v-focus
        />
        <div class="app_btns">
            <my-button
                @click="showDialog"
            >
                Создать новый пост
            </my-button>
            <my-select 
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
                @create="createPost"
            />
        </my-dialog>
        <post-list 
            :posts="sortedAndSearchedPosts"
            @delete="deletePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идёт загрузка</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>    
</template>

<script>
import PostList from '@/components/PostList'
import PostForm from '@/components/PostForm'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            dialogVisible: false,
            setPage: 'post/setPage',
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
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
        }
    },
    mounted() {

    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            searchQuery: state => state.post.searchQuery,
            selectedSort: state => state.post.selectedSort,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
            sortedPosts: 'post/sortedPosts'
        })
    },
    watch: {
        /* page() {
            this.fetchPosts()
        } */
    }
}
</script>

<style>

.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.page_wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}
.current_page {
    border: 2px solid teal;

}

.observer {
    height: 30px;
    background: green;
}
</style>