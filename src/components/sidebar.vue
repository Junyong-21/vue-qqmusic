<template>
            <el-menu
                class="w-[204px] h-full p-4 text-xl "
                :class="{ 'bg-[#e5e7eb]': !darkMode }"
                active-text-color="#ffd04b"
                router
                :default-active="router.currentRoute.value.path"
            >
                <el-menu-item-group title="在线音乐" >
                    <div v-for="(item, key) in onlineMusic" :key="key" >
                        <el-menu-item :index="item.index" class="m-1"><i class="bi mr-2" :class="item.icon"></i>{{ item.name }}</el-menu-item>
                    </div>
                </el-menu-item-group>
                <el-menu-item-group title="我的音乐">
                    <div v-for="(item, key) in myMusic" :key="key">
                        <el-menu-item :index="item.index" class="m-1"><i class="bi mr-2" :class="item.icon"></i>{{ item.name }}</el-menu-item>
                    </div>
                </el-menu-item-group>
            </el-menu>
</template>

<script setup lang='ts'>
import { useDarkMode } from '@/stores/darkMode';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const darkModeStore = useDarkMode()
const { darkMode: darkMode } = storeToRefs(darkModeStore)

const router = useRouter()

const onlineMusic = [
    {
        name: '推荐',
        index: '/recommend',
        icon: 'bi-activity'
    },
    {
        name: '音乐馆',
        index: '/musicHall',
        icon: 'bi-music-note-beamed'
    },
    {
        name: '视频',
        index: '/video',
        icon: 'bi-camera-reels'
    },
    {
        name: '电台',
        index: '/radio',
        icon: 'bi-boombox'
    },
]

const myMusic = [
    {
        name: '我喜欢',
        index: '/myFavorite',
        icon: 'bi-bookmark-heart'
    },
    {
        name: '本地歌曲',
        index: '/localMusic',
        icon: 'bi-house-down-fill'
    },
    {
        name: '下载歌曲',
        index: '/myDownloads',
        icon: 'bi-cloud-download'
    },
    {
        name: '最近播放',
        index: '/recentlyPlayed',
        icon: 'bi-hourglass-bottom'
    },
]
</script>
<style scoped>

.el-menu {
    border-right: 0;
    }
.el-menu-item.is-active {
    background-image: linear-gradient(to left, #2dd4bf, #34d399) !important;
    color: white;
    border-radius: 5px;
}

.el-menu-item:hover {
    background-color: #909399 !important;
    border-radius: 5px;
}

</style>