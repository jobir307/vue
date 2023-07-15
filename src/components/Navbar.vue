<template>
    <div class="navbar">
        <router-link to="/">Главная</router-link>
        <div class="navbar_btns">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 20px" >О сайте</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.navbar {
    height: 70px;
    background-color: darkgrey;
    box-shadow: 2px 2px 4px gray;
    align-items: center;
    padding: 0 15px;
}
.navbar_btns {
    margin-left: auto;
}
</style>