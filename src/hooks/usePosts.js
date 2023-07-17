import axios from "axios";
import {onMounted, ref} from 'vue'

export function usePosts(limit){
    // ref - это реактивные переменные
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(true)

    const fetching = () => {
        try {
            setTimeout(async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
                posts.value = response.data
            }, 500);
        } catch (error) {
            console.log(error)
        } finally {
            isPostsLoading.value = false
        }
    }
    onMounted(fetching)
    return {
        posts, isPostsLoading, totalPages
    }
}