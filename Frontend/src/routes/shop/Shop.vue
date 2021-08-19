<template>
    <div class="mt-8">
        <div class="container">
            <ShopHeader />
            <h2 class="mt-8">Neuste Produkte</h2>
            <ShopList />
        </div>
    </div>
</template>

<script setup>
import ShopList from './ShopList.vue'
import ShopHeader from './ShopHeader.vue'
</script>

<style>
.container {
    max-width: 1200px;
    margin: 0 auto;
}

body {
    margin: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
