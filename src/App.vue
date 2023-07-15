<template>
    <div class="app">
        <Navbar/>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar';
    export default {
        components: {
            Navbar
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