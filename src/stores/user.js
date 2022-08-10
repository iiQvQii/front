import { defineStore } from 'pinia'
import { api, apiAuth } from '../boot/axios'
import Swal from 'sweetalert2'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    account: '',
    name: '',
    Avatar: '',
    tel: '',
    mobile: '',
    email: '',
    city: '',
    district: '',
    address: '',
    zipcode: '',
    description: '',
    photos: '',
    gender: '',
    birth: '',
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
      return 'https://source.boringavatars.com/beam/120/' + this.account + this.role
    }
  },
  actions: {
    async login (form) {
      try {
        const { data } = await api.post('/users/login', form)
        this.token = data.result.token
        this.account = data.result.account
        this.name = data.result.name
        this.Avatar = data.result.avatar || ''
        this.tel = data.result.tel || ''
        this.mobile = data.result.mobile || ''
        this.email = data.result.email || ''
        this.city = data.result.city || ''
        this.district = data.result.district || ''
        this.address = data.result.address || ''
        this.zipcode = data.result.zipcode || ''
        this.description = data.result.description || ''
        this.photos = data.result.photos || ''
        this.gender = data.result.gender || ''
        this.birth = data.result.birth || ''
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
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤!'
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
    async editUserInfo (form) {
      try {
        // 單個上傳
        // const fd = new FormData()
        // for (const key in form) {
        //   if (key === 'photos') {
        //     fd.append(key, form[key][0])
        //   } else {
        //     fd.append(key, form[key])
        //   }
        // }
        console.log(form)
        const fd = new FormData()
        for (const key in form) {
          // console.log(form.photos)
          // console.log(key)
          if (key === 'photos') {
            for (let i = 0; i < form[key].length; i++) {
              fd.append(key, form[key][i])
            }
            console.log(form[key])
          } else {
            fd.append(key, form[key])
          }
        }
        console.log(fd)

        const { data } = await apiAuth.patch('/users/edit_info', fd)
        this.account = data.result.account
        this.name = data.result.name
        this.Avatar = data.result.avatar || ''
        this.tel = data.result.tel || ''
        this.mobile = data.result.mobile || ''
        this.email = data.result.email || ''
        this.city = data.result.city || ''
        this.district = data.result.district || ''
        this.address = data.result.address || ''
        this.zipcode = data.result.zipcode || ''
        this.description = data.result.description || ''
        this.photos = data.result.photos || ''
        this.gender = data.result.gender || ''
        this.birth = data.result.birth || ''
        this.role = data.result.role
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤!'
        })
      }
    },
    // 因為要存localstorage
    async getUser () {
      if (this.token.length === 0) return
      try {
        const { data } = await apiAuth.get('/users')
        this.account = data.result.account
        this.name = data.result.name
        this.Avatar = data.result.avatar || ''
        this.tel = data.result.tel || ''
        this.mobile = data.result.mobile || ''
        this.email = data.result.email || ''
        this.city = data.result.city || ''
        this.district = data.result.district || ''
        this.address = data.result.address || ''
        this.zipcode = data.result.zipcode || ''
        this.description = data.result.description || ''
        this.photos = data.result.photos || ''
        this.gender = data.result.gender || ''
        this.birth = data.result.birth || ''
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
