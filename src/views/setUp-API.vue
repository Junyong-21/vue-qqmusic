<template>
    <div class="w-full h-full flex justify-center items-center">
        <div class="w-1/3">
            <el-input size="large" placeholder="http://127.0.0.1:3000" v-model="host">
            <template #prepend>API 地址</template>
            <template #append>
                <el-button @click="setHostLocal">确定</el-button>
            </template>
        </el-input>
        <div class="flex justify-center m-2">如何搭建？</div>
        <div class="flex justify-center hover:text-[#34d399]"><a href="https://binaryify.github.io/NeteaseCloudMusicApi">网易云音乐-API文档</a></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router';

const host = ref('');

const router = useRouter()
const setHostLocal = () => {
    if (host.value != '') {
        localStorage.setItem('host', host.value);
        ElMessage.success('添加成功')
        router.push('/')
    } else {
        ElMessage.error('请输入您的API')
    }
}
</script>
<style scoped>

</style>