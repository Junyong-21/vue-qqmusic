import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
    persist: true,
    state: () => {
        return {
			profile: {
				userid: 0,
				nickname: '点击登录',
				avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
			} as userInfoObj,
			loginStatus: false,
		};
    },
    actions: {
        toggleMode () {
            this.loginStatus = !this.loginStatus;
        }
    }
})

interface userInfoObj {
    userid: number,
    nickname: string,
    avatarUrl: string,
}