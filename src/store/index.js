import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ 
  position: 'top-right'
})


export default createStore({
  state: {
    user: null,
    toast:false,
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state) {
      state.user = null
    },
  },
  
  actions: {
    async login ({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            toaster.show(`User not found`);
            break
          case 'auth/wrong-password':
            toaster.show(`Wrong password`);
            break
          default:
            toaster.show(`Something went wrong`);
        }
        return
      }
      commit('SET_USER', auth.currentUser)
      console.log(auth.currentUser)
      router.push('/')
      toaster.show(`Welcome back`);
    },

    async register ({ commit}, details) {
       const { email, password } = details
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            toaster.show(`Email already in use`)
            break
          case 'auth/invalid-email':
            toaster.show(`Invalid email`)
            break
          case 'auth/operation-not-allowed':
            toaster.show(`Operation not allowed`)
            break
          case 'auth/weak-password':
            toaster.show(`Weak password`)
            break
          default:
        }
        return
      }
      commit('SET_USER', auth.currentUser)
      router.push('/')
      toaster.show(`Hi, it is your profile. Have a nice time`)
    },
    async logout ({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/login?=message=logout')
      toaster.show(`LOGOUT`)
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)
          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
            console.log(auth.currentUser)
          }
        }
      })
    }
  }
})