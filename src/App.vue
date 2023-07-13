<template>
    <div class="app">
        <form onsubmit="">
            <h4>Создание поста</h4>
            <input class="input" type="text" placeholder="Название">
            <input class="input" type="text" placeholder="Описание">
            <button class="button" @click="createPost">Добавить новый пост</button>
        </form>
        <div class="post" v-for="post in posts">
            <div><strong>Название:</strong>{{ post.title }}</div>
            <div><strong>Описание:</strong>{{ post.body }}</div>
        </div>
        
    </div>    
</template>

<script>
export default {
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
        
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
.app {
    padding: 20px;
}
form {
    display: flex;
    flex-direction: column;

}
.button {
    padding: 10px 15px;
    border: 1px solid teal;
    margin-top: 15px;
    align-self: flex-end;
    background: teal;
    color: white;
    border-radius: 10px;
}

</style>