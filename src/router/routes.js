import MainLayout from 'layouts/MainLayout.vue'
import HomeLayout from 'layouts/HomeLayout.vue'
import HomePage from 'pages/front/HomePage.vue'

const routes = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'front_home',
        component: () => import('pages/front/HomePage.vue'),
        meta: {
          title: 'Workweee我耶 | Home',
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
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [

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
        component: () => import('pages/front/AdminLogin.vue'),
        meta: {
          title: 'Workweee我耶 | 登入管理員',
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
        path: 'jobs/search',
        name: 'jobs_search',
        component: () => import('pages/front/FindJobs.vue'),
        meta: {
          title: 'Workweee我耶 | 換宿機會',
          login: false,
          admin: false
        }
      },
      {
        path: 'jobs/:id',
        name: 'jobs_id',
        component: () => import('pages/front/JobPage.vue'),
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
        name: 'admin_home',
        component: () => import('pages/back/AdminPage.vue'),
        meta: {
          title: 'Workweee我耶 | 後台會員中心',
          login: true,
          host: false,
          admin: false
        }
      },
      {
        path: 'jobs',
        name: 'admin/jobs',
        component: () => import('pages/back/JobPage.vue'),
        meta: {
          title: 'Workweee我耶 | 刊登換宿',
          login: true,
          host: true,
          admin: false
        }
      },
      {
        path: 'jobs/:id',
        name: 'admin/jobs_edit',
        component: () => import('pages/back/EditJob.vue'),
        meta: {
          title: 'Workweee我耶 | 編輯刊登換宿',
          login: true,
          host: true,
          admin: false
        }
      },
      {
        path: 'jobs_post',
        name: 'jobs_post',
        component: () => import('pages/back/PostJob.vue'),
        meta: {
          title: 'Workweee我耶 | 新增換宿機會',
          login: true,
          host: true,
          admin: false
        }
      },
      {
        path: 'application_status',
        name: 'application_status',
        component: () => import('pages/back/ApplicationStatus.vue'),
        meta: {
          title: 'Workweee我耶 | 報名狀態',
          login: true,
          host: false,
          admin: false
        }
      },
      {
        path: 'helper/:id',
        name: 'helper',
        component: () => import('pages/back/HelperPage.vue'),
        meta: {
          title: 'Workweee我耶 | 小幫手資訊',
          login: true,
          host: true,
          admin: false
        }
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
