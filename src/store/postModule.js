import axios from 'axios'
export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: { // getters - это computed свойство
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: { // мутация предназначена для изменения состояние
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    })
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                    commit('setPosts', response.data)
                }, 500);
            } catch (error) {
                console.log(error)
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}) { // commit - mutation ni chaqirish uchun kerak !
            try {
                commit('setPage',  state.page + 1)
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    })
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                    commit('setPosts', [...state.posts, ...response.data])
                }, 500);
            } catch (error) {
                console.log(error)
            }
        }
    },
    namespaced: true
} 