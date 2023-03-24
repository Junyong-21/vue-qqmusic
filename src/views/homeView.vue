<template>
    <div class="w-full h-full">
        <sidebar></sidebar>
        <Header></Header>
        <Suspense>
            <div class="absolute top-[56px] left-[204px] right-0 bottom-[60px] p-5 pt-6 overflow-y-auto">
                <router-view></router-view>
            </div>
        </Suspense>
        <Suspense>
            <play class="absolute bottom-0 left-[204px] right-0"></play>
        </Suspense>
    </div>
</template>

<script setup lang='ts'>
import sidebar from '@/components/sidebar.vue';
import Header from '@/components/header.vue';
import play from '@/components/play.vue'

</script>
