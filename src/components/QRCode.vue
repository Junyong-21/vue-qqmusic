<template>
    <QRCode :value="qrUrl" :size="180" level="H"></QRCode>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import QRCode from 'qrcode.vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/userInfo';

const router = useRouter()
const emit = defineEmits(['close'])
const userInfoStore = useUserInfoStore()

// 二维码生成
const createQRCode = async (key: string) => {
    // 
    const qrUrl = await axios.get(`${ localStorage.getItem('host') }login/qr/create?key=${key}&timestamp=${Date.now()}`);
    console.log('qrcode',qrUrl.data)
    return qrUrl.data.data.qrurl;
}

// 二维码检测扫码状态
const checkStatus = async (key: string) => {
    let timer: any
    // 800 为二维码过期,
    // 801 为等待扫码,
    // 802 为待确认,
    // 803 为授权登录成功
    timer = setInterval(async () => {
        const status = await axios.get(`${ localStorage.getItem('host') }login/qr/check?key=${key}&timestamp=${Date.now()}`)
        console.log(status);
        if (status.data.code === 800) {
            ElMessage.error('二维码已过期，请重新获取')
            clearInterval(timer)
        } 
        else if (status.data.code === 803) {
            clearInterval(timer)
            ElMessage.success('授权登陆成功')
            localStorage.setItem('cookie', status.data.cookie)
            userInfoStore.loginStatus = true;
            const profile = await axios({
                method: 'get',
                url:`${ localStorage.getItem('host') }user/account?cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`,
                withCredentials: true
            })
            userInfoStore.profile = profile.data.profile
            console.log(userInfoStore.profile);
            emit('close')
        }
    }, 3000)
}

// 二维码key生成
const getQRCodeKey = async () => {
    const key = await axios.get(`${ localStorage.getItem('host') }login/qr/key?timestamp=${Date.now()}`)
    console.log('key',key);
    return key.data.data.unikey
}

const key = await getQRCodeKey()
const qrUrl = await createQRCode(key)
await checkStatus(key)



</script>
<style scoped>

</style>