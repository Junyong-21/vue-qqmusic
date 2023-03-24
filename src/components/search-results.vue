<template>
    <div class="-mt-5">
        <!-- 显示歌手、专辑搜索结果 -->
        <header class="h-[120px] flex items-center">
            <!-- 歌手信息 -->
            <div class="w-1/2 p-2 flex items-center">
                <img :src="artists[0].picUrl" alt="" class="w-[90px] h-[95px] rounded-full ml-2" >
                <div class="flex flex-col justify-center ml-2">
                    <p class="text-xl">歌手：{{ artists[0].name }}</p>
                    <p class="text-sm text-slate-500">专辑：{{ artists[0].albumSize }}</p>
                </div>
                <i class="bi bi-chevron-right flex flex-1 justify-end"></i>
            </div>
            <!-- 专辑信息 -->
            <div class="w-1/2 flex items-center">
                <ProgressiveImage lazy-placeholder :src="mv[0].cover" alt="" class="bg-slate-300 w-[120px] h-[65px] ml-3" />
                <p class="text-xl ml-3">MV：{{ mv[0].name }}</p>
                <i class="bi bi-chevron-right flex flex-1 justify-end"></i>
            </div>
        </header>
        <hr>
        <div class="w-full h-[35px] flex items-center mt-3">
            <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2" :class="{ 'bottomBorder rounded-lg': flag == 1}" @click="showResult(1, 1)">单曲&nbsp;</div>
            <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2" :class="{ 'bottomBorder rounded-lg': flag == 2}" @click="showResult(2, 10)">专辑&nbsp;</div>
            <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2" :class="{ 'bottomBorder rounded-lg': flag == 3}" @click="showResult(3, 100)">歌手&nbsp;</div>
            <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2" :class="{ 'bottomBorder rounded-lg': flag == 4}" @click="showResult(4, 1000)">歌单</div>
            <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2" :class="{ 'bottomBorder rounded-lg': flag == 5}" @click="showResult(5, 1002)">用户</div>
            <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2" :class="{ 'bottomBorder rounded-lg': flag == 6}" @click="showResult(6, 1004)">MV</div>
            <div class="w-[80px] h-full hover:text-green-500 cursor-pointer flex items-center justify-center mb-1 mr-2" :class="{ 'bottomBorder rounded-lg': flag == 7}" @click="showResult(7, 1006)">歌词</div>
        </div>
        <!-- 单曲 -->
        <div class="w-full flex-col mt-2" v-show="flag == 1">
            <div class="flex mb-2 shadow-sm">
                    <p class="text-slate-500 text-sm w-1/2">歌曲</p>
                    <p class="text-slate-500 text-sm w-1/4">歌手</p>
                    <p class="text-slate-500 text-sm w-1/4">专辑</p>
                </div>
                <!-- 循环展示歌曲名字 -->
                <div class="w-full h-[50px] mt-1 flex items-center text-slate-800 text-sm" v-for="(item, key) in single">
                    <i class="bi bi-suit-heart mr-2 text-slate-600 hover:text-red-500 cursor-pointer"></i>
                    <p class="w-1/2  cursor-pointer hover:text-green-500" @click="playStore.updateData(playList, key)">{{ item.name }}</p>
                    <p class="w-1/4 -ml-6  cursor-pointer  hover:text-green-500" @click="toSingerDeatil(item.ar[0].id)"  v-if="item.ar.length == 1">{{ item.ar[0].name }}</p>
                    <p class="w-1/4 -ml-6  cursor-pointer " v-else ><span v-for="(name, key) in item.ar" ><span class="hover:text-green-500" @click="toSingerDeatil(name.id)">{{ name.name }}</span>&nbsp<span v-if="key != item.ar.length - 1">/</span>&nbsp</span></p>
                    <p class="w-1/4 cursor-pointer hover:text-green-500">{{ item.al.name }}</p>
                </div>
        </div>
        <!-- 专辑 -->
        <div class="w-full flex flex-col" v-show="flag == 2">
            <div class=" w-full h-[100px] flex items-center" v-for="(item, key) in album">
                <div class="w-1/2 flex items-center">
                    <ProgressiveImage lazy-placeholder :src="item.blurPicUrl" alt="" class="w-[80px] h-[80px] rounded-lg hover:cursor-pointer"/>
                    <span class="ml-3 hover:text-green-500 cursor-pointer">{{ item.name }}</span>
                </div>
                <div class="w-1/4 hover:text-green-500 cursor-pointer text-sm">{{ item.artist.name }}</div>
                <div class="flex flex-1 justify-end mr-2 text-xs text-slate-500">{{ toPublishTime(item.publishTime) }}</div>
            </div>
        </div>
        <!-- 歌手 -->
        <div class="w-full flex flex-wrap" v-show="flag == 3" >
            <div class="w-[200px] h-[220px] flex flex-col items-center mt-5 mr-5" v-for="item in artists">
                <ProgressiveImage lazy-placeholder :src="item.picUrl" alt="" class="w-[180px] h-[180px] rounded-full cursor-pointer" />
                <p class="text-lg mt-1 hover:text-green-500 cursor-pointer">{{ item.name }}</p>
                <p class="text-sm text-slate-500 cursor-pointer">专辑：{{ item.albumSize }}</p>
            </div>
        </div>
        <!-- 歌单 -->
        <div class="w-full" v-show="flag == 4">
            <div class=" w-full h-[100px] flex items-center" v-for="(item, key) in playList">
                <div class="w-1/2 flex items-center">
                    <ProgressiveImage lazy-placeholder :src="item.coverImgUrl" alt="" class="w-[80px] h-[80px] rounded-lg hover:cursor-pointer" />
                    <span class="ml-3 hover:text-green-500 cursor-pointer">{{ item.name }}</span>
                </div>
                <div class="w-1/4 text-sm hover:text-green-500 cursor-pointer">{{ item.creator.nickname }}</div>
                <div class="flex flex-1 justify-end mr-2 text-xs text-slate-500">{{ item.bookCount }}人收藏</div>
            </div>
        </div>
        <!-- 用户 -->
        <div class="w-full flex-col" v-show="flag == 5">
            <div class="flex w-full h-[120px] items-center" v-for="item in user">
                <div class="w-1/2 flex items-center">
                    <ProgressiveImage lazy-placeholder :src="item.avatarUrl" alt="" class="w-[80px] h-[80px] rounded-full cursor-pointer" />
                    <p class="ml-2 hover:text-green-500 cursor-pointer">{{ item.nickname }}<span v-if="item.detailDescription" class="ml-1 text-sm text-slate-500">({{ item.detailDescription }})</span></p>
                </div>
                <div class="w-1/4 text-sm text-slate-500 cursor-pointer">
                    歌单：{{ item.playlistCount }}
                </div>
                <div class="flex flex-1 justify-end text-sm text-slate-500 mr-2 cursor-pointer">
                    粉丝：{{ item.followeds }}
                </div>
            </div>
        </div>
        <!-- MV -->
        <div class="w-full flex flex-wrap mt-1 mb-3" v-show="flag == 6">
                <div class="w-auto PC:h-[310px] laptop:h-[244.36px] m-2 mt-4" v-for="(item, key) in mv">
                    <ProgressiveImage lazy-placeholder :src="item.cover" alt="" class="w-full PC:h-[270px] laptop:h-[204.36px] rounded-lg hover:cursor-pointer" />
                    <p class="mt-1 text-sm cursor-pointer hover:text-green-500">{{ item.name }}</p>
                    <p class="mt-1 text-xs text-slate-500">播放次数：{{ item.playCount }}</p>
                </div>
            </div>
        <!-- 歌词 -->
        <div class="w-ful flex flex-col " v-show="flag == 7">
            <div class="h-[130px] pl-4" v-for="item in lyrics">
                <div class="w-full h-full flex flex-col justify-center">
                    <div class="flex">
                        <p class="w-1/3 hover:text-green-500 cursor-pointer">{{ item.name }}</p>
                        <p class="w-1/3  cursor-pointer hover:text-green-500" @click="toSingerDeatil(item.ar[0].id)"  v-if="item.ar.length == 1">{{ item.ar[0].name }}</p>
                        <p class="w-1/3  cursor-pointer " v-else ><span v-for="(name, key) in item.ar" ><span class="hover:text-green-500" @click="toSingerDeatil(name.id)">{{ name.name }}</span>&nbsp<span v-if="key != item.ar.length - 1">/</span>&nbsp</span></p>
                        <p class="w-1/3 flex"><span class="hover:text-green-500 cursor-pointer">{{ item.al.name }}</span><span class="flex flex-1 justify-end text-sm text-slate-500 ">{{ playStore.toTime(parseInt((item.dt / 1000).toString()).toString()) }}</span></p>
                    </div>
                    <p v-html="item.lyrics[0]" class="text-slate-500 text-sm"></p>
                    <p class="text-slate-500 text-sm">{{ item.lyrics[1] }}</p>
                    <p class="text-slate-500 text-sm">{{ item.lyrics[2] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useSearchResultMode } from '@/stores/searchResultStore';
import { usePlayStore } from '@/stores/playStore';
import { storeToRefs } from 'pinia';

const router = useRouter()
const flag = ref(1)
const playStore = usePlayStore()
const searchResultStore = useSearchResultMode()
const {	single, album, artists, playList, user, mv, lyrics, radio, video} = storeToRefs(searchResultStore)

await searchResultStore.requestSearchResult(router.currentRoute.value.query.value, 1)
// 加载单曲、歌手以及mv
await searchResultStore.requestSearchResult(router.currentRoute.value.query.value, 100),
await searchResultStore.requestSearchResult(router.currentRoute.value.query.value, 1004)

// 根据选项请求数据
const showResult = async ( flagValue: number, type:number) => {
    flag.value = flagValue
    await searchResultStore.requestSearchResult(router.currentRoute.value.query.value, type)
}

// 跳转至歌手详情
const toSingerDeatil = (id: number) => {
    router.push({path: '/singerDetail', query: { id }})
}

// 计算发布时间
const toPublishTime = (time: string) => {
    return new Date(time).getFullYear() + '-' + Number(new Date(time).getMonth() + 1) + '-' + new Date(time).getDate();
}
</script>
<style scoped>
.bottomBorder {
    border-bottom: solid 4px;
    border-image: linear-gradient(180deg, #2dd4bf, #34d399) 2 2 2 2;
}
</style>