<template>
    <div class="-mt-5">
        <header class="w-full h-[200px] flex p-2">
            <!-- 歌单图片 -->
            <ProgressiveImage :src="songCommentInfo.coverImgUrl" alt="" class="w-[180px] h-[180px] rounded-lg " />
            <!-- 歌曲信息 -->
            <div class="flex flex-col ml-3">
                <!-- 歌单名称 -->
                <div class="h-[30px] text-3xl mt-1 p-4 pt-0 font-bold">
                    {{ songCommentInfo.name }}
                </div>
                <!-- 歌单作者 -->
                <div class="p-2 pl-3 mt-1 flex items-center">
                    <ProgressiveImage :src="songCommentInfo.creator.avatarUrl" alt="" class="w-[25px] h-[25px] rounded-full" />
                    <span class="pl-2 text-sm">{{ songCommentInfo.creator.nickname }}</span>
                    <span v-for="item in songCommentInfo.tags" class="text-slate-500 text-sm ml-3">#{{ item }}</span>
                </div>
                <!-- 歌曲详情 -->
                <div class="p-3 pt-0 text-slate-500 text-sm overflow-auto">
                    {{ songCommentInfo.description }}
                </div>
                <!-- 播放按钮， 收藏 -->
                <div class="p-2" v-once>
                    <button class="playButton w-[120px] h-[30px] rounded-3xl mr-4 text-white"><i class="bi bi-play"></i>播放全部</button>
                    <button class="bg-slate-200 w-[120px] h-[30px] rounded-3xl">收藏</button>
                </div>
            </div>
        </header>
        <main class="w-full h-full ">
            <!-- 歌手评论切换 -->
            <div class="w-full h-[35px] flex items-center ml-2 mt-5 ">
                <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1" :class="{ 'bottomBorder rounded-lg': flag == 1}" @click="flag = 1">歌曲&nbsp;{{ playList.length }}</div>
                <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1" :class="{ 'bottomBorder rounded-lg': flag == 2}" @click="flag = 2">评论&nbsp;{{ commentsList.length }}</div>
            </div>
            <!-- 歌曲列表 -->
            <div class="w-full flex flex-col p-2 pt-0 mt-1" v-show="flag == 1">
                <div class="flex mb-2 shadow-sm">
                    <p class="text-slate-500 text-sm w-1/2">歌曲</p>
                    <p class="text-slate-500 text-sm w-1/4">歌手</p>
                    <p class="text-slate-500 text-sm w-1/4">专辑</p>
                </div>
                <!-- 循环展示歌曲名字 -->
                <div class="w-full h-[50px] mt-1 flex items-center text-slate-800 text-sm" v-for="(item, key) in playList">
                    <i class="bi bi-suit-heart mr-2 text-slate-600 hover:text-red-500 cursor-pointer"></i>
                    <p class="w-1/2  cursor-pointer" @click="playStore.updateData(playList, key)">{{ item.name }}</p>
                    <p class="w-1/4 -ml-6  cursor-pointer hover:text-green-500" @click="toSingerDeatil(item.ar[0].id)"  v-if="item.ar.length == 1">{{ item.ar[0].name }}</p>
                    <p class="w-1/4 -ml-6  cursor-pointer " v-else ><span v-for="(name, key) in item.ar" ><span class="hover:text-green-500" @click="toSingerDeatil(name.id)">{{ name.name }}</span>&nbsp<span v-if="key != item.ar.length - 1">/</span>&nbsp</span></p>
                    <p class="w-1/4 cursor-pointer hover:text-green-500">{{ item.al.name }}</p>
                </div>
            </div>
            <!-- 歌单评论 -->
            <div class="w-full flex flex-col p-2 pt-0" v-show="flag == 2">
                <div class="laptop:w-[1310px] PC:w-[1700px] mb-2 text-black text-sm w-full shadow-sm p-2 pl-0">
                    精彩评论
                </div>
                <!-- 循环展示歌曲名字 -->
                <div class="w-full h-[120px] mt-1 flex flex-col text-slate-800 p-2 border-b-2 m-2" v-for="(item, key) in commentsList">
                    <!-- 用户信息 -->
                    <div class="w-full h-[30px] flex ">
                        <ProgressiveImage lazy-placeholder :src="item.user.avatarUrl" alt="" class="rounded-full w-[30px] h-[30px] " />
                        <div class="flex-1 flex flex-col ml-2">
                            <!-- 用户名称 -->
                            <span class="text-xs text-slate-500">{{ item.user.nickname }}</span>
                            <!-- 评论时间 -->
                            <span class="text-xs text-slate-500">{{ item.timeStr }}</span>
                        </div>
                        <span class="left-2"><i class="bi bi-suit-heart mr-1 text-red-500"></i>{{ item.likedCount }}</span>
                    </div>
                    <!-- 评论内容 -->
                    <div class="flex-1 ml-9 mt-4 text-sm">{{ item.content }}</div>
                    <span class="text-slate-500 ml-9 text-xs cursor-pointer">回复</span>
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
import { storeToRefs } from 'pinia';
const router = useRouter()
const playStore = usePlayStore()
const {songId} = storeToRefs(playStore)

const songCommentInfo = ref<any>({})
const playList = ref<any>([])
const commentsList = ref<any>([])

// 歌曲和评论切换    false 表示歌手     true表示评论
const flag = ref(1)



const getData = async () => {
    const tmpData = await Promise.all([
        axios.get(`${ localStorage.getItem('host') }playlist/detail?id=${router.currentRoute.value.query.id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`), 
        axios.get(`${ localStorage.getItem('host') }playlist/track/all?id=${router.currentRoute.value.query.id}&limit=10&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`), 
        axios.get(`${ localStorage.getItem('host') }comment/playlist?id=${router.currentRoute.value.query.id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`)
    ])
    console.log(tmpData)
    songCommentInfo.value = tmpData[0].data.playlist
    playList.value = tmpData[1].data.songs
    commentsList.value = tmpData[2].data.hotComments
    console.log('歌单详情', songCommentInfo.value)
    console.log('歌单歌曲',playList.value)
    console.log('歌单评论', commentsList.value)
}
await getData()

const toSingerDeatil = (id: number) => {
    router.push({path: '/singerDetail', query: { id }})
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