import { defineStore } from 'pinia'
import axios from 'axios'
export const usePlayStore = defineStore('playStore', {
	state: () => {
		return {
			songId: 0,
			songUrl: {} as any,
			songData: {} as any,
			musicDuration: '',
			musicDurationNumber: 0,
			playing: false,
			playList: [] as any,
			listKey: 0,
		};
	},
    persist: {
        storage: sessionStorage,
    },
	actions: {
		async updateData(playList: [], key: number) {
			this.playing = false;
			this.playList = playList;
			this.listKey = key;
			this.songId = this.playList[this.listKey].id;
			this.getSongData();
			this.getSongUrl();
            console.log(this.playList.value)
		},
		async getSongUrl() {
			console.log(this.playList);
			const songUrlData = await axios.get(
				`${localStorage.getItem('host')}song/url?id=${
					this.playList[this.listKey].id
				}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`
			);
            console.log(songUrlData)
			this.songUrl = songUrlData.data.data[0];
			this.musicDuration = this.toTime(
				parseInt((this.songUrl.time / 1000).toString()).toString()
			);
			this.musicDurationNumber = parseInt((this.songUrl.time / 1000).toString());
			console.log('当前歌曲', this.songUrl);
		},
		async getSongData() {
			// 获取歌曲详情
			const data = await axios.get(
				`${localStorage.getItem('host')}song/detail?ids=${
					this.playList[this.listKey].id
				}&cookie=${localStorage.getItem('cookie')}&timestamp=${Date.now()}`
			);
			this.songData = data.data.songs[0];
			console.log('歌曲详情', this.songData);
		},
		toTime(sec: any) {
			let s: any = sec % 60 < 10 ? '0' + (sec % 60) : sec % 60;
			let min = Math.floor(sec / 60) < 10 ? '0' + Math.floor(sec / 60) : Math.floor(sec / 60);
			if (!isNaN(s)) {
				return min + ':' + s;
			} else {
				return '00' + ':' + '00';
			}
		},
	},
});