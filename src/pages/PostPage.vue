<template>
    <div>
        <h2>Страница с постами</h2>
        <my-input 
            v-model="searchQuery"
            placeholder="Поиск..."
        />
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
            :posts="sortedAndSearchedPosts"
            @delete="deletePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идёт загрузка</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page_wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber"
                class="page"
                :class="{
                    'current_page': pageNumber === page
                }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
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
            searchQuery: '',
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPages: 0,
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
        /* 
        changePage(pageNumber) {
            this.page = pageNumber
        },*/
        async fetchPosts() {
            try {
                this.isPostsLoading = true
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data
                }, 500);
            } catch (error) {
                console.log(error)
            } finally {
                this.isPostsLoading = false
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...response.data]
                }, 500);
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.fetchPosts()
        console.log(this.$refs.observer)
        // let options = {
        //     root: document.querySelector("#scrollArea"),
        //     rootMargin: "0px",
        //     threshold: 1.0,
        // };
        // let callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPages){
        //         this.loadMorePosts()
        //     }
        // }
        // let observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer)

    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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