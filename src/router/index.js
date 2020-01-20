import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Storage from '../services/storage'
import Profile from '../views/Profile.vue'
import MyPost from '../views/MyPost.vue'
import ResetPassword from '../views/ResetPassword.vue'
import FavoritePost from '../views/FavoritePost.vue'
import PostDetail from '../views/PostDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/mypost',
    name: 'My Post',
    component: MyPost
  },
  {
    path: '/favoritepost',
    name: 'Favorite Post',
    component: FavoritePost
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      public: true,
      onlyWhenLogOut: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,
      onlyWhenLogOut: true
    }
  },
  {
    path: '/resetpassword',
    name: 'resetPassword',
    component: ResetPassword,
    meta: {
      public: true,
      onlyWhenLogOut: true
    }
  },
  {
    path: '/post-detail',
    name: 'PostDetail',
    component: PostDetail,
    props: (route) => ({ postID: route.query.postID })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = Storage.getItem()

  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLogout = to.matched.some(record => record.meta.onlyWhenLogOut)

  if (!isPublic && !token) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  if (token && onlyWhenLogout) {
    return next('/')
  }
  return next()
})

export default router
