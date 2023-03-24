<template>
    <div class="h-[90px] flex flex-col">
        <div :class="{'bg-white': !darkMode}">
            <audio :src="songUrl.url" ref="audio" @timeupdate="updateProgress" @ended="next"></audio>
            <el-slider class='laptop:w-[1330px] PC:w-[1720px]' v-model="progress" :show-tooltip="false" @change="changeMusicDuration" @mousedown.native="isDragging = true" @mouseup.native="isDragging = false"></el-slider>
        </div>
        <div class="h-[50px] flex items-center p-2 ">
            <!-- left -->
            <div class="w-[480px] h-[50px] flex items-center ml-[15px]">
                <img class="w-[44px] h-[44px] rounded-lg ml-[10px]" :src="songData.al.picUrl" >
                <div class="flex flex-col ml-2">
                    <p class="text-xs">{{ songData.name }} - {{ songData.ar[0].name }}</p>
                    <div>
                        <button>
                            <i class="bi bi-suit-heart w-[25px] h-[25px] ml-2 hover:text-green-500" @click="songInfoStore.changeLikeIconStatus(songUrl.id)" v-show="!likeIconFlag"></i>
                            <i class="bi bi-suit-heart-fill w-[25px] h-[25px] ml-2 text-red-500" @click="songInfoStore.changeLikeIconStatus(songUrl.id)" v-show="likeIconFlag"></i>
                        </button>
                        <button>
                            <i class="bi bi-download w-[25px] h-[25px] ml-4 hover:text-green-500"></i>
                        </button>
                        <button><i class="bi bi-chat-square-dots w-[25px] h-[25px] ml-4 hover:text-green-500"></i></button>
                    </div>
                </div>
            </div>
            <!-- center -->
            <div class="w-[280px] h-[50px] ml-[200px] flex items-center justify-center text-4xl">
                <button><i class="bi bi-skip-start-fill mr-5 hover:text-green-500" @click="previous"></i></button>
                <button>
                    <i class="bi bi-pause-circle-fill hover:text-green-500" v-if="playing" @click="pause"></i>
                    <i class="bi bi-play-circle-fill hover:text-green-500" v-else @click="play"></i>
                </button>
                <button><i class="bi bi-skip-end-fill ml-5 hover:text-green-500" @click="next"></i></button>
            </div>
            <!-- right -->
            <div class="w-[400px] h-[50px] ml-[425px] flex justify-center items-center">
                <!-- 歌曲时间 -->
                <p class="text-gray-600">{{ toTime(musicCurrentTime) }} / {{ musicDuration }}</p>
                <!-- palylist -->
                <button class="ml-4" @click="drawer = true"><i class="bi bi-music-note-list"></i></button>
                <el-drawer 
                v-model="drawer"
                title="播放队列"
                size="20%"
                >
                    <div class="flex flex-col h-[55px] hover:bg-slate-300" v-for="(item, key) in playList" @click="playStore.updateData(playList, key)">
                        <!-- 歌曲名称 -->
                        <div class="w-full h-1/2 text-sm"> {{ item.name }}</div>
                        <!-- 歌手、时长 -->
                        <div class="w-full h-1/2">
                            <span v-if="item.hasOwnProperty('artists')">
                                <span class="float-left text-sm text-slate-500">{{ item.artists[0].name }}</span>
                                <span class="float-right text-sm text-slate-500">{{ playStore.toTime(parseInt((item.duration / 1000).toString()).toString()) }}</span>
                            </span>
                            <span v-else>
                                <span class="float-left text-sm text-slate-500">{{ item.ar[0].name }}</span>
                                <span class="float-right text-sm text-slate-500">{{ playStore.toTime(parseInt((item.dt / 1000).toString()).toString()) }}</span>
                            </span>
                        </div>
                        <hr>
                    </div>
                </el-drawer>
            </div>
            
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useSongInfoStore } from '@/stores/songInfo';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { usePlayStore } from '@/stores/playStore';
import { useDarkMode } from '@/stores/darkMode';
import { ElMessage } from 'element-plus';

const playStore = usePlayStore()
const {  songData, songUrl, musicDuration,musicDurationNumber, playing,playList,listKey } = storeToRefs(playStore)
const songInfoStore = useSongInfoStore()
const { likeIconFlag } = storeToRefs(songInfoStore)
const darkModeStore = useDarkMode()
const { darkMode: darkMode } = storeToRefs(darkModeStore)
const isDragging = ref(false)
const drawer = ref(false)

if ( !sessionStorage.getItem("playStore") ||playList.value.length == 0) {
    await songInfoStore.getPersonalFM()
}


// 转换时间格式
const toTime = (sec: any) => { //秒数转化为mm:ss形式
    let s: any = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
    let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
    if (!isNaN(s)) {
        return min + ':' + s
    } else {
        return "00" + ':' + "00"
    }
}

const audio = ref()
// 歌曲当前时间
const musicCurrentTime = ref()
// 进度条
const progress = ref()


// 播放功能
const play = () => {
    audio.value.play();
    playing.value = !playing.value
}

// 暂停功能
const pause = () => {
    audio.value.pause()
    playing.value = !playing.value
}

// 更新进度条
const updateProgress = () => {
    if (isDragging.value == true) {
        return
    }
    musicCurrentTime.value = parseInt(audio.value.currentTime)
    progress.value = musicCurrentTime.value / (musicDurationNumber.value) * 100
}

const changeMusicDuration = () => {
    musicCurrentTime.value = progress.value * musicDurationNumber.value / 100
    audio.value.currentTime  = parseInt(musicCurrentTime.value)
    isDragging.value = false
}

// 下一首
const next = () => {
    if (playList.value.length == 1 ) {
        console.log(playList.value)
        songInfoStore.getPersonalFM()
    } else {
        if (listKey.value == playList.value.length - 1) {
            ElMessage.success('已经是歌单的第一首歌啦~')
        } else {
            listKey.value++
        }
        playing.value = false
        playStore.getSongUrl()
        playStore.getSongData()
    }
    songInfoStore.$reset()
}

// 上一首
const previous = () => {
    if (listKey.value == 0) {
        ElMessage.success('已经是歌单的第一首歌啦~')
    } else {
        listKey.value++
    }
    playing.value = false
    playStore.getSongUrl()
    playStore.getSongData()
}
</script>
<style>

.el-slider__bar {
    background-color: rgba(16, 185, 129);
}

.el-slider__button {
    border: solid 2px rgba(16, 185, 129)
}
</style>