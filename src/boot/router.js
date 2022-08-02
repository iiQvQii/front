import { boot } from 'quasar/wrappers'

export default boot(({ router, store }) => {
  router.afterEach((to, from) => {
    document.title = to.meta.title
  })
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
  })
})
