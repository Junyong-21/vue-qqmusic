<template>
    <h1 class="text-3xl font-bold" v-once>推荐</h1>
    <!-- 今日推荐 -->
    <div class="mt-2 w-full h-[335px]" v-once>
        <div class="flex">
            <h1  class="text-xl">Hi <span v-show="profile.nickname !== '点击登录'">{{ profile.nickname }}</span> 今日为你推荐</h1>
            <i class="bi bi-arrow-repeat flex flex-1 justify-end mr-4 cursor-pointer" @click="refreshThePage"></i>
        </div>
        <div class="h-[304px] flex">
            <!-- 个性电台 -->
            <div class="w-1/3 py-2 pr-2" @click="getPersonalFMId">
                <div class="PC:h-[270px] laptop:h-[204.36px] w-full rounded-lg flex" :style="`background-image: url('${personalFM.album.picUrl}')`">
                    <div class="flex items-center pl-7 h-full w-full FM rounded-lg">
                        <ProgressiveImage object-cover class="w-[150px] h-[150px] rounded-lg ml-1" :src="personalFM.album.picUrl" />
                        <div class="flex flex-col text-white font-bold pl-5">
                            <p class="text-xl">{{ personalFM.name }}</p>
                            <p>{{ personalFM.artists[0].name }}</p>
                            <div class="flex mt-2 text-xl h-[38px]">
                                <button>
                                    <i class="bi bi-skip-end-fill w-[28px] h-[28px] text-2xl hover:text-3xl" @click="nextSong"></i>
                                </button>
                                <button>
                                    <i class="bi bi-suit-heart w-[25px] h-[25px] ml-2 hover:text-2xl" @click="songInfoStore.changeLikeIconStatus(personalFM.id)" v-show="!likeIconFlag"></i>
                                    <i class="bi bi-suit-heart-fill w-[25px] h-[25px] ml-2 text-red-500 hover:text-2xl" @click="songInfoStore.changeLikeIconStatus" v-show="likeIconFlag"></i>
                                </button>
                                <button>
                                    <i class="bi bi-heartbreak w-[25px] h-[25px] ml-2 hover:text-2xl" @click="songInfoStore.changeUnLikeIconStatus(personalFM.id)" v-show="!unlikeIconFlag"></i>
                                    <i class="bi bi-heartbreak-fill w-[25px] h-[25px] ml-2 text-red-500 hover:text-2xl" @click="songInfoStore.changeUnLikeIconStatus" v-show="unlikeIconFlag"></i>
                                </button>
                                <button><i class="bi bi-chat-square-dots w-[25px] h-[25px] ml-4 hover:text-2xl"></i></button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <p class="mt-2">个性电台</p>
            </div>
            <!-- 私人雷达 -->
            <div  class="w-1/6 PC:h-[270px] laptop:h-[204.36px] m-2 ml-0">
                <ProgressiveImage :src="todayRecommendList[0].picUrl" class="w-full h-full rounded-lg hover:cursor-pointer" @click="toComments(recommendedDaily.id)" />
                <p class="mt-2">{{ todayRecommendList[0].title }}</p>
            </div>
            <!-- 推荐电台 -->
            <div  class="w-1/6 PC:h-[270px] laptop:h-[204.36px] m-2 ml-0">
                <ProgressiveImage :src="todayRecommendList[1].picUrl" class="w-full h-full rounded-lg hover:cursor-pointer" @click="toComments(recommendedDjProgram.id)" />
                <p class="mt-2">{{ todayRecommendList[1].title }}</p>
            </div>
            <!-- 网友精选 -->
            <div  class="w-1/6 PC:h-[270px] laptop:h-[204.36px] m-2 ml-0">
                <ProgressiveImage :src="todayRecommendList[2].picUrl" class="w-full h-full rounded-lg hover:cursor-pointer" @click="toComments(playList.id)" />
                <p class="mt-2">{{ todayRecommendList[2].title }}</p>
            </div>
            <!-- 新歌速递 -->
            <div  class="w-1/6 PC:h-[270px] laptop:h-[204.36px] m-2 ml-0">
                <ProgressiveImage :src="todayRecommendList[3].picUrl" class="w-full h-full rounded-lg hover:cursor-pointer" @click="router.push('topSong')" />
                <p class="mt-2">{{ todayRecommendList[3].title }}</p>
            </div>
        </div>
    </div>
    <!-- 精品歌单 -->
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo';
import { useSongInfoStore } from '@/stores/songInfo'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter()
const userInfoStore = useUserInfoStore()
const { profile } = storeToRefs(userInfoStore)
const songInfoStore = useSongInfoStore();
if (sessionStorage.getItem("songInfo") == null || Object.keys(JSON.parse(sessionStorage.getItem("songInfo")as any).personalFM).length == 0 ) {
    await Promise.all([songInfoStore.getPersonalFM(), songInfoStore.getPLayLists(), songInfoStore.getRecommendedDaily(), songInfoStore.getRecommendedDjProgram(), songInfoStore.getTopSong()])
}
const { topSong,recommendedDjProgram, recommendedDaily,personalFM, likeIconFlag, unlikeIconFlag, playList} = storeToRefs(songInfoStore)

const refreshThePage = () => {
    songInfoStore.$reset()
    router.go(0)
}

const todayRecommendList = ref([
    {
        title: '私人雷达',
        picUrl: recommendedDaily.value.picUrl
    },
    {
        title: '推荐电台',
        picUrl: recommendedDjProgram.value.picUrl
    },
    {
        title: '网友精选',
        picUrl: playList.value.coverImgUrl
    },
    {
        title: '新歌推荐',
        picUrl: topSong.value[0].album.blurPicUrl
    },
])

const nextSong =  () => {
    songInfoStore.getPersonalFM()
    songInfoStore.$reset()
}

// 获取歌曲ID
const getPersonalFMId = () => {
    localStorage.setItem('songId', personalFM.value.id)
}

const toComments = (id: string) => {
    router.push({ path:'/detail', query: { id } })
}

</script>
<style scoped>
.FM {
    backdrop-filter: blur(25px);
}
</style>