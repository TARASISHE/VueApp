import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'

export default createStore({
  state: {
    user: null
  },
  mutations: {

    SET_USER (state, user) {
      state.user = user
    },

    CLEAR_USER (state) {
      state.user = null
    }

  },
  actions: {
    async login ({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
        M.toast({html: 'Welcome back'})
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            M.toast({html: 'User not found'})
            break
          case 'auth/wrong-password':
            M.toast({html: "Wrong password"})
            break
          default:
            alert("Something went wrong")
        }
        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async register ({ commit}, details) {
       const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
        M.toast({html: 'Hi.It is your profile, have a nice time'})
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            M.toast({html: 'Email already in use'})
            break
          case 'auth/invalid-email':
            M.toast({html: 'Invalid email'})
            break
          case 'auth/operation-not-allowed':
            M.toast({html: "Operation not allowed"})
            break
          case 'auth/weak-password':
            M.toast({html: "Weak password"})
            break
          default:
            alert("Something went wrong")
        }
        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login?=message=logout')
      M.toast({html: 'Logout'})
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    }
    
  }
})