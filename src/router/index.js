import { createRouter, createWebHashHistory } from 'vue-router'
import { auth } from '../firebase'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Calculator from '../views/Calculator.vue'
import Todo from '../views/Todo.vue'
import WeatherForecast from '../views/WeatherForecast.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
   routes :
      [
    {
      path: "/",
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:"/login",
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register, 
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator,
      meta:{
        requiresAuth:true,
      }
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo,
      meta:{
        requiresAuth:true,
      }
    },
    {
      path: '/weather-forecast',
      name: 'Weather-Forecast',
      component: WeatherForecast,
      meta:{
        requiresAuth:true,
      }
    }
  ],
  
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }else if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }
  next();
})

export default router
