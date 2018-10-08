import Vue from 'vue'
import Router from 'vue-router'
import Reader from '@/components/Reader'
import UserBooks from '@/components/UserBooks'
import BookShelf from '@/components/BookShelf'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Reader',
      component: Reader,
      children: [
        {
          path: '/:userId',
          name: 'UserBooks',
          component: UserBooks,
          children: [
            {
              path: 'shelf/:shelfId',
              name: 'BookShelf',
              component: BookShelf
            }
          ]
        }
      ]
    }
  ]
})
