import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'

export const useSearchResultMode = defineStore('searchResult', {
	state: () => {
		return {
			// 单曲
			single: [] as any,
			// 专辑信息
			album: [] as any,
			// 歌手    包含搜索结果数量  artistCount
			artists: [] as any,
			// 歌单
			playList: [] as any,
			// 用户
			user: [] as any,
			// MV    包含mv数量   mvCount
			mv: [] as any,
			// 歌词
			lyrics: [] as any,
			// 电台
			radio: [] as any,
			// 视频
			video: [] as any,
		};
	},
	actions: {
        checkData (type:number) {
            switch (type) {
				case 1:
					// 单曲
					return this.single.length != 0;
				case 10:
					// 专辑信息
					return this.album.length != 0;
				case 100:
					// 歌手
					return this.artists.length != 0;
				case 1000:
					// 歌单
					return this.playList.length != 0;
				case 1002:
					// 用户
					return this.user.length != 0;
				case 1004:
					// MV
					return this.mv.length != 0;
				case 1006:
					// 歌词
					return this.lyrics.length != 0;
			}
        },
		async requestSearchResult(value: any, type: number) {
            if (this.checkData(type)) {
                return ;
            }
			const data: any = await axios.get(
				`${localStorage.getItem(
					'host'
				)}cloudsearch?keywords=${value}&type=${type}&limit=50&cookie=${localStorage.getItem(
					'cookie'
				)}&timestamp=${Date.now()}`
			);
			console.log(data);
			switch (type) {
				case 1:
					// 单曲
					this.single = data.data.result.songs;
					break;
				case 10:
					// 专辑信息
					this.album = data.data.result.albums;
					break;
				case 100:
					// 歌手
					this.artists = data.data.result.artists;
					break;
				case 1000:
					// 歌单
					this.playList = data.data.result.playlists;
					break;
				case 1002:
					// 用户
					this.user = data.data.result.userprofiles;
					break;
				case 1004:
					// MV
					this.mv = data.data.result.mvs;
					break;
				case 1006:
					// 歌词
					this.lyrics = data.data.result.songs;
					break;
			}
		},
	},
});
