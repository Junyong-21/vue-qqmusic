<template>
    <teleport to='body'>
        <div class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center items-center" v-if="userInfoStore.loginStatus">
            <div class="w-[400px] h-[300px] bg-white flex flex-col">
                <div class="w-full flex justify-center items-center px-2 h-[40px]" >
                    <div class="w-[370px] flex justify-center items-center"><span>二维码登录</span></div>
                    <button class="flex-1 border-none" @click="$emit('closeLogin')"><el-icon><CloseBold /></el-icon></button>
                </div>
                <div class="w-full flex justify-center items-center h-[200px] pt-5">
                    <QRCode @close="closeEmit"></QRCode>
                </div>
                <div class="w-full h-[60px] flex flex-1 justify-center items-center">
                    <p>请扫码登录</p>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang='ts'>
import QRCode from '@/components/QRCode.vue'
import { useUserInfoStore } from '@/stores/userInfo';

const userInfoStore = useUserInfoStore()


const emit = defineEmits(['closeLogin'])

const closeEmit = () => {
    emit('closeLogin');
}

</script>
<style scoped>

</style>