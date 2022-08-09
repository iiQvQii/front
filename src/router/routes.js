import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/front/IndexPage.vue'

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
        component: () => import('pages/front/RegisterPage.vue'),
        meta: {
          title: 'Workweee我耶 | 註冊會員',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/front/LoginPage.vue'),
        meta: {
          title: 'Workweee我耶 | 登入會員',
          login: false,
          admin: false
        }
      },
      {
        path: 'login/admin',
        name: 'login_admin',
        component: () => import('pages/AdminLogin.vue'),
        meta: {
          title: 'Workweee我耶 | 登入管理員',
          login: false,
          admin: false
        }
      },
      {
        path: 'about_us',
        name: 'about_us',
        component: () => import('pages/front/AboutUs.vue'),
        meta: {
          title: 'Workweee我耶 | 關於Workweee',
          login: false,
          admin: false
        }
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: () => import('pages/front/FindJobs.vue'),
        meta: {
          title: 'Workweee我耶 | 換宿機會',
          login: false,
          admin: false
        }
      },
      {
        path: 'faqs',
        name: 'faqs',
        component: () => import('pages/front/FAQs.vue'),
        meta: {
          title: 'Workweee我耶 | 換宿FAQs',
          login: false,
          admin: false
        }
      },
      {
        path: 'contact_us',
        name: 'contact_us',
        component: () => import('pages/front/ContactUs.vue'),
        meta: {
          title: 'Workweee我耶 | 聯絡我們',
          login: false,
          admin: false
        }
      }

    ]
  },
  // 後台 ------------------------------------------------------------------------------------
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/back/AdminPage.vue')
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: () => import('pages/back/JobPage.vue')
      },
      {
        path: 'application_status',
        name: 'application_status',
        component: () => import('pages/back/ApplicationStatus.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: 'Workweee我耶 | 404找不到'
    }
  }
]

export default routes
