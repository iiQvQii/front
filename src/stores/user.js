import { defineStore } from 'pinia'
import { api, apiAuth } from '../boot/axios'
import Swal from 'sweetalert2'
import router from 'src/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    account: '',
    role: ''
  }),
  getters: {
    isLogin () {
      return this.token.length !== 0
    },
    isAdmin () {
      return this.role === 0
    },
    isHost () {
      return this.role === 1
    },
    isHelper () {
      return this.role === 2
    },
    avatar () {
      return 'https://source.boringavatars.com/beam/120/' + this.account
    }
  },
  actions: {
    async login (form) {
      try {
        const { data } = await api.post('/users/login', form)
        this.token = data.result.token
        this.account = data.result.account
        this.role = data.result.role
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '登入成功'
        })
        this.router.push('/')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
        })
      }
    },
    async logout () {
      try {
        await apiAuth.delete('users/logout')
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '登出成功'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤?'
        })
      }
      this.token = ''
      this.account = ''
      this.role = null
    },
    // 因為要存localstorage
    async getUser () {
      if (this.token.length === 0) return
      try {
        const { data } = await apiAuth.get('/users')
        this.account = data.result.account
        this.role = data.result.role
      } catch (error) {
        this.logout()
      }
    }
  },
  persist: {
    key: 'workweee',
    paths: ['token']
  }
})
