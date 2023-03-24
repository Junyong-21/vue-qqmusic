import { defineStore } from 'pinia'
import { usePlayStore } from '@/stores/playStore'
import axios from 'axios'
export const useSongInfoStore = defineStore('songInfo', {
    state: () => {
        return {
            personalFM: {} as any,
            recommendedDaily: {} as any,
            recommendedDjProgram: {} as any,
            playList:{} as any,
            topSong: [] as any,
            likeIconFlag: false,
            unlikeIconFlag: false,
            like: false,
        }
    },
    persist: {
        storage: sessionStorage,
    },
    actions: {
        // 获取私人FM
        async getPersonalFM () {
            const  FMData = await axios({
                method: 'get',
                url: `${ localStorage.getItem('host') }personal_fm?cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`,
                withCredentials: true
            })
            this.personalFM = FMData.data.data[0]; 
            usePlayStore().$reset()
            usePlayStore().playList.push(this.personalFM)
            usePlayStore().playing = false
            await usePlayStore().getSongUrl()
            await usePlayStore().getSongData()
            console.log("私人FM",this.personalFM)
        },
        // 获取日推歌单
        async getRecommendedDaily () {
            const data = await axios({
				method: 'get',
				url: `${ localStorage.getItem('host') }recommend/resource?cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`,
				withCredentials: true,
			});
            this.recommendedDaily = data.data.recommend[0]
            console.log("私人雷达",this.recommendedDaily);
        },
        // 获取推荐电台
        async getRecommendedDjProgram () {
            const data = await axios({
					method: 'get',
					url: `${ localStorage.getItem('host') }personalized/djprogram?cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`,
					withCredentials: true,
				});
            this.recommendedDjProgram = data.data.result[0]
            console.log('推荐电台', this.recommendedDjProgram);
        },
        // 获取网友精选歌单
        async getPLayLists () {
            const data = await axios({
					method: 'get',
					url: `${localStorage.getItem('host')}top/playlist?limit=10&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`,
					withCredentials: true,
				});
            this.playList = data.data.playlists[0]
            console.log('网友精选', data.data.playlists)
        },
        // 获取新歌速递
        async getTopSong () {
            const data = await axios({
					method: 'get',
					url: `${localStorage.getItem('host')}top/song?type=0&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`,
					withCredentials: true,
				});
            console.log('新歌速递',data);
            this.topSong = data.data.data
        },
        // 收藏歌曲
        async changeLikeIconStatus (id: string) {
            this.likeIconFlag = !this.likeIconFlag
            this.unlikeIconFlag = false
            const code = await axios.post(`${ localStorage.getItem('host') }like?id=${id}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`);
        },
        //
        async changeUnLikeIconStatus (id: string) {
            this.unlikeIconFlag = !this.unlikeIconFlag
            this.likeIconFlag = false
            const code = await axios.post(`${ localStorage.getItem('host') }like?id=${id}&like=false&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`)
        }
    }
})