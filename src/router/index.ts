import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/homeView.vue'),
			redirect: '/recommend',
			children: [
				{
					path: '/recommend',
					name: '推荐',
					component: () => import('@/views/recommend.vue'),
				},
				{
					path: '/musicHall',
					name: '音乐馆',
					component: () => import('@/views/musicHall.vue'),
				},
				{
					path: '/video',
					name: '视频',
					component: () => import('@/views/video.vue'),
				},
				{
					path: '/radio',
					name: '电台',
					component: () => import('@/views/radio.vue'),
				},
				{
					path: '/myFavorite',
					name: '我喜欢',
					component: () => import('@/views/myFavorite.vue'),
				},
				{
					path: '/localMusic',
					name: '本地歌曲',
					component: () => import('@/views/localMusic.vue'),
				},
				{
					path: '/myDownloads',
					name: '下载歌曲',
					component: () => import('@/views/myDownloads.vue'),
				},
				{
					path: '/recentlyPlayed',
					name: '最近播放',
					component: () => import('@/views/recently-Played.vue'),
				},
				{
					path: '/detail',
					name: '歌单详情',
					component: () => import('@/components/detail.vue'),
				},
				{
					path: '/topSong',
					name: '新歌推荐',
					component: () => import('@/views/top-Song.vue'),
				},
				{
					path: '/singerDetail',
					name: '歌手详情',
					component: () => import('@/components/singer-detail.vue'),
				},
				{
					path: '/searchResult',
					name: '搜索结果',
					component: () => import('@/components/search-results.vue'),
				},
			],
		},
		{
			path: '/setUpAPI',
			name: 'setUpAPI',
			component: () => import('@/views/setUp-API.vue'),
		},
	],
});

export default router
