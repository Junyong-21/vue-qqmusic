import { defineStore } from "pinia";
import { ref} from 'vue'

export const useDarkMode = defineStore('darkMode',{
    state: () => {
        return {
            darkMode: ref(false)
        }
    },
    actions: {
        toggleMode() {
            this.darkMode = !this.darkMode
        }
    }
})