<template>
    <div class="h-[56px] absolute left-[204px] right-0 top-0 bottom-0 flex items-center shadow-md" >
        <div class="h-screen ml-[20px] flex items-center">
            <span class="p-[5px] hover:cursor-pointer" @click="router.go(-1)"><i class="bi bi-chevron-left"></i></span>
            <span class="p-[5px] hover:cursor-pointer" @click="router.go(1)"><i class="bi bi-chevron-right"></i></span>
            <el-input class="inline ml-3" placeholder="搜索音乐、MV、歌单" v-model="searchResult" @keyup.enter.native="router.push({path: '/searchResult', query:{ value: searchResult }})">
                <template #prefix>
                    <i class="bi bi-search-heart"></i>
                </template>
                <template #suffix>
                    <i class="bi bi-arrow-return-left"></i>
                </template>
            </el-input>
        </div>
        <div class="flex flex-1 items-center justify-end mr-5">
            <button class="border-none flex items-center mr-4">
                <el-avatar :size="35" :src="profile.avatarUrl" class="mr-1"/>
                <span class="text-xs hover:text-[#34d399]" @click="userInfoStore.toggleMode">{{ profile.nickname}}</span>
            </button>
            <i class="bi bi-envelope"></i>
            <el-switch
                v-model="isDark"
                style="margin-left: 24px"
                inline-prompt
                :active-icon="Moon"
                :inactive-icon="Sunny"
                :active-value="true"
                :inactive-value="false"
                @change="darkModeStore.toggleMode"
            />
            <el-dropdown 
                trigger="click"
            >
                <i class="bi bi-sliders ml-4"></i>
                <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item @click="router.push('/setUpAPI')"><i class="bi bi-hdd-stack-fill"></i>API设置</el-dropdown-item>
                    <el-dropdown-item @click="logOut"><i class="bi bi-exclamation-circle-fill"></i>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <Suspense>
            <login @closeLogin="userInfoStore.toggleMode"></login>
        </Suspense>
    </div>
</template>

<script setup lang='ts'>

import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark } from '@vueuse/core';
import { useDarkMode } from '@/stores/darkMode'
import { useUserInfoStore } from '@/stores/userInfo'
import { useSearchResultMode } from '@/stores/searchResultStore';
import login from '@/components/login.vue'
import { ref } from 'vue';
import router from '@/router';
import { storeToRefs } from 'pinia';

const searchResult = ref('')
const isDark = useDark()
const darkModeStore = useDarkMode()
const userInfoStore = useUserInfoStore()
const searchResultStore = useSearchResultMode()

const {profile} = storeToRefs(userInfoStore)

const logOut = () => {
    userInfoStore.$reset();
    localStorage.removeItem('cookie')
}

</script>
<style scoped>
.el-input__wrapper {
    background-color: rgb(241 245 249);
    border-radius: 25px;
}


.is-focus {
    box-shadow: 0 0 0 1px #6ee7b7 !important;
}
</style>