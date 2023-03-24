<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="w-screen h-screen all">
        <RouterView></RouterView>
    </div>
</template>

<style>
    @import '@/assets/smiley-sans/font.css';
    ::-webkit-scrollbar {
        width: 0 !important;
    }
    ::-webkit-scrollbar {
        width: 0 !important;height: 0;
    }
    
    #app {
        font-family: 'DEYIHEI';
    }
</style>

