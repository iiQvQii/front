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
          title: '打工換宿 | Home'
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
        meta: {
          title: '打工換宿 | 註冊會員'
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          title: '打工換宿 | 登入會員'
        }
      }

    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdminPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
