<template>
    <div>
        <h2>Страница с постами</h2>
        <my-input 
            v-model="searchQuery"
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
    </div>    
</template>

<script>
import PostList from '@/components/PostList'
import PostForm from '@/components/PostForm'
import axios from 'axios'
import {ref} from 'vue'

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ]
        }
    },
    setup(props) {
        return {
            
        }
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