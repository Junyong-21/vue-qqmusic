<template>
        <div class="-mt-5">
        <header class="w-full h-[200px] flex p-2">
            <!-- 歌单图片 -->
            <img :src="topList[0].album.picUrl" alt="" class="w-[180px] h-[180px] rounded-lg ">
            <!-- 歌曲信息 -->
            <div class="flex flex-col ml-3">
                <!-- 歌单名称 -->
                <div class="h-[30px] text-3xl mt-1 p-4 pt-0 font-bold">
                    新歌推荐
                </div>
                <!-- 歌单作者 -->
                <div class="p-2 pl-3 mt-1 flex items-center">
                    <img src="https://ts1.cn.mm.bing.net/th/id/R-C.4308183c51167d4ca1ead67d398bfb2d?rik=hicZfhc91bwBGg&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2019%2f06-30%2f67865%2fwater_67865_260_260.png&ehk=PJ5kmaaQKbTmFPOxwwP7RvKSOvflnJNvaaGUpcgDvlE%3d&risl=&pid=ImgRaw&r=0" alt="" class="w-[25px] h-[25px] rounded-full">
                    <span class="pl-2 text-sm">网易云音乐</span>
                </div>
                <!-- 歌单详情 -->
                <div class="p-3 pt-0 text-slate-500 text-sm">
                    #新歌推荐#新歌推荐#新歌推荐#新歌推荐#新歌推荐#新歌推荐
                </div>
                <!-- 播放按钮， 收藏 -->
                <div class="p-2">
                    <button class="playButton w-[120px] h-[30px] rounded-3xl mr-4 text-white"><i class="bi bi-play"></i>播放全部</button>
                    <button class="bg-slate-200 w-[120px] h-[30px] rounded-3xl">收藏</button>
                </div>
            </div>
        </header>
        <main class="w-full h-full mt-2">
            <!-- 歌曲列表 -->
            <div class="w-full flex flex-col p-2 pt-0">
                <div class="flex mb-2">
                    <p class="text-slate-500 text-sm w-1/2">歌曲</p>
                    <p class="text-slate-500 text-sm w-1/4">歌手</p>
                    <p class="text-slate-500 text-sm w-1/4">专辑</p>
                </div>
                <!-- 循环展示歌曲名字 -->
                <div class="w-full h-[50px] mt-1 flex items-center text-slate-800" v-for="(item, key) in topList">
                    <i class="bi bi-suit-heart mr-2 text-slate-600 hover:text-red-500 cursor-pointer"></i>
                    <p class="w-1/2 "><span class="cursor-pointer" @click="playStore.updateData(topList,key)">{{ item.name }}</span></p>
                    <p class="w-1/4 -ml-6  "><span class="cursor-pointer hover:text-green-500">{{ item.artists[0].name }}</span></p>
                    <p class="w-1/4 "><span class="cursor-pointer hover:text-green-500">{{ item.album.name }}</span></p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang='ts'>
import axios from 'axios';
import { ref,reactive } from 'vue'
import { usePlayStore } from '@/stores/playStore';

const playStore = usePlayStore()
const topList = ref<any>([])
const getTopSong = async () => {
    const data = await axios.get(`${localStorage.getItem('host')}top/song?type=0&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`)
    topList.value = data.data.data
    console.log(topList.value);
}
await getTopSong()
</script>
<style scoped>
.playButton {
    background-image: linear-gradient(to left, #2dd4bf, #34d399)
}

.showBox:checked {
    border-bottom: solid 1px black;
}
</style>