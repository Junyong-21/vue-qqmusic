<template>
    <div class="-mt-5">
        <header class="w-full h-[200px] flex p-2">
            <!-- 歌手图片 -->
            <img :src="singerDetails.artist.cover" alt="" class="w-[180px] h-[180px] rounded-full ">
            <!-- 歌手信息 -->
            <div class="flex flex-col ml-3">
                <!-- 歌手名称 -->
                <div class="h-[30px] text-3xl mt-1 p-3 pt-0 font-bold">
                    {{ singerDetails.artist.name }}
                </div>
                <!-- 歌手详细详情 -->
                <div class="p-3 pt-0 text-slate-500 text-sm mt-2 h-[115px] overflow-auto">
                    <span>{{ singerDetails.artist.briefDesc }}</span>
                </div>
                <!-- 关注按钮， 收藏 -->
                <div class="p-2 pt-1">
                    <button class="playButton w-[120px] h-[30px] rounded-3xl mr-4 text-white"><i class="bi bi-plus"></i>关注歌手</button>
                    <button class="bg-slate-200 w-[120px] h-[30px] rounded-3xl">歌手电台</button>
                </div>
            </div>
        </header>
        <main class="w-full h-full ">
            <!-- 歌手歌曲和歌曲详情切换 -->
            <div class="w-full h-[35px] flex items-center ml-2 mt-5 ">
                <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1" :class="{ 'bottomBorder rounded-lg': flag == 1}" @click="flag = 1">精选&nbsp;{{ singerTopSongList .length }}</div>
                <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1" :class="{ 'bottomBorder rounded-lg': flag == 2}" @click="flag = 2">歌曲&nbsp;{{ singerAllSongList .length }}</div>
                <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1" :class="{ 'bottomBorder rounded-lg': flag == 3}" @click="flag = 3">专辑&nbsp;{{ singerTopAlbumList.length }}</div>
                <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1" :class="{ 'bottomBorder rounded-lg': flag == 4}" @click="flag = 4">详情</div>
            </div>
            <!-- 精选歌曲 -->
            <div class="w-full flex flex-col p-2 pt-0 mt-1" v-show="flag == 1">
                <div class="flex mb-2">
                    <p class="text-slate-500 text-sm w-1/2">歌曲</p>
                    <p class="text-slate-500 text-sm w-1/2">专辑</p>
                </div>
                <!-- 循环展示歌曲名字 -->
                <div class="w-full h-[50px] mt-1 flex items-center text-slate-800 text-sm" v-for="(item, key) in singerTopSongList">
                    <i class="bi bi-suit-heart mr-2 text-slate-600 hover:text-red-500 cursor-pointer"></i>
                    <p class="w-1/2  cursor-pointer" @click="playStore.updateData(singerTopSongList, key)">{{ item.name }}</p>
                    <p class="w-1/2 cursor-pointer hover:text-green-500">{{ item.al.name }}</p>
                </div>
            </div>
            <!-- 全部歌曲 -->
            <div class="w-full flex flex-col p-2 pt-0 mt-1" v-show="flag == 2">
                <div class="flex mb-2">
                    <p class="text-slate-500 text-sm w-1/2">歌曲</p>
                    <p class="text-slate-500 text-sm w-1/2">专辑</p>
                </div>
                <!-- 循环展示歌曲名字 -->
                <div class="w-full h-[50px] mt-1 flex items-center text-slate-800 text-sm" v-for="(item, key) in singerAllSongList">
                    <i class="bi bi-suit-heart mr-2 text-slate-600 hover:text-red-500 cursor-pointer"></i>
                    <p class="w-1/2  cursor-pointer" @click="playStore.updateData(singerAllSongList, key)">{{ item.name }}</p>
                    <p class="w-1/2 cursor-pointer hover:text-green-500">{{ item.al.name }}</p>
                </div>
            </div>
            <!-- 专辑页面 -->
            <div class="w-full flex flex-wrap mt-1" v-show="flag == 3">
                <div class="w-1/6 PC:h-[310px] laptop:h-[244.36px] m-2 mt-4" v-for="(item, key) in singerTopAlbumList">
                    <img v-lazy="item.blurPicUrl" alt="" class="w-full PC:h-[270px] laptop:h-[204.36px] rounded-lg hover:cursor-pointer">
                    <p class="mt-1 text-sm">{{ item.name }}</p>
                    <p class="mt-1 text-xs text-slate-500">{{ toPublishTime(item.publishTime) }}</p>
                </div>
            </div>
            <!-- 评论页面 -->
            <div class="w-full flex-col p-5" v-show="flag == 4">
                <!-- briefDesc -->
                <p class="text-lg font-bold">简介</p>
                <div class="pt-1 text-sm">{{ singerDesc.briefDesc }}</div>
                <!-- introduction -->
                <div v-if="singerDesc.introduction.length != 0" v-for="(item, key) in singerDesc.introduction" class="pt-5" >
                    <p class="text-lg font-bold mb-1">{{ item.ti }}</p>
                    <div class="">{{ item.txt }}</div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang='ts'>
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { usePlayStore } from '@/stores/playStore';

const playStore = usePlayStore()
// 1.精选歌曲     2.全部歌曲    3.专辑   4.详情
const flag = ref(1);

const router = useRouter()
console.log(router.currentRoute.value.query.id)
// 获取歌手详情
const singerDetails = ref<any>({})
// 获取歌手热门单曲
const singerTopSongList = ref<any>([])
// 歌手全部歌曲
const singerAllSongList = ref<any>([])
// 获取歌手专辑
const singerTopAlbumList = ref<any>([])
// 获取歌手描述
const singerDesc = ref()
const tmpData = await Promise.all([
    // 获取歌手详情
    axios.get(`${ localStorage.getItem('host') }artist/detail?id=${router.currentRoute.value.query.id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`),
    // 获取歌手热门单曲
    axios.get(`${ localStorage.getItem('host') }artists?id=${router.currentRoute.value.query.id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`), 
    // 歌手全部歌曲
    axios.get(`${ localStorage.getItem('host') }artist/songs?id=${router.currentRoute.value.query.id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`), 
    // 获取歌手专辑
    axios.get(`${ localStorage.getItem('host') }artist/album?id=${router.currentRoute.value.query.id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`), 
    // 获取歌手描述
    axios.get(`${ localStorage.getItem('host') }artist/desc?id=${router.currentRoute.value.query.id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`)
])
singerDetails.value = tmpData[0].data.data
console.log('歌手详情', singerDetails.value);
singerTopSongList.value = tmpData[1].data.hotSongs
console.log('歌手热门歌曲', singerTopSongList.value)
singerAllSongList.value = tmpData[2].data.songs
console.log('歌手全部歌曲', singerAllSongList.value)
singerTopAlbumList.value = tmpData[3].data.hotAlbums
console.log('歌手专辑', singerTopAlbumList.value)
singerDesc.value = tmpData[4].data
console.log('歌手评论',singerDesc.value)

const toPublishTime = (time: string) => {
    return new Date(time).getFullYear() + '-' + Number(new Date(time).getMonth() + 1) + '-' + new Date(time).getDate();
}
</script>
<style scoped>
.playButton {
    background-image: linear-gradient(to left, #2dd4bf, #34d399)
}

.bottomBorder {
    /* border-bottom:solid 2px linear-gradient(to left, #2dd4bf, #34d399) ; */
    border-bottom: solid 4px;
    border-image: linear-gradient(180deg, #2dd4bf, #34d399) 2 2 2 2;
}
</style>