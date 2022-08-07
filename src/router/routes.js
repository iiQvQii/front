import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/IndexPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: IndexPage,
        meta: {
          title: 'Workweee我耶 | Home',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
        meta: {
          title: 'Workweee我耶 | 註冊會員',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          title: 'Workweee我耶 | 登入會員',
          login: false,
          admin: false
        }
      },
      {
        path: 'login/admin',
        component: () => import('pages/AdminLogin.vue'),
        meta: {
          title: 'Workweee我耶 | 登入管理員',
          login: false,
          admin: false
        }
      }

    ]
  },
  // 後台 -------------------------------------------------------------
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/AdminPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: 'Workweee我耶 | 404找不到'
    }
  }
]

export default routes
