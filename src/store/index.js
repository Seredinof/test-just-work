import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: 1,
    userBooks: [],
    bookShelfs: [],
    currentBookShelf: null,
    sort: null
  },
  mutations: {
    getUserBooks (state, payload) {
      state.userBooks = payload
    },
    addUserBooks (state, payload) {
      const obj = state.userBooks.objects
      state.userBooks = {
        ...payload,
        objects: [
          ...obj,
          ...payload.objects
        ]
      }
    },
    getBookShelfs (state, payload) {
      state.bookShelfs = payload
    },
    setCurrentBookShelf (state, payload) {
      state.currentBookShelf = payload
    },
    setUserId (state, payload) {
      state.userId = payload
    },
    toggleSort (state, payload) {
      if (state.sort === payload || state.sort === payload.replace('-', '')) {
        state.sort = (payload.search(/-/) === -1) ? ('-' + payload) : payload.replace('-', '')
      } else {
        state.sort = payload
      }
    }
  },
  actions: {
    async getBookShelfs (context, userId) {
      await fetch('/api/userbooks/bookshelf/?user=' + userId)
        .then(response => {
          return response.json()
        })
        .then(bookShelfs => {
          context.commit('getBookShelfs', bookShelfs)
        })
    },
    async getUserBooks (context, payload) {
      let url = ''
      if (payload.next) {
        url = payload.next
      } else {
        url = '/api/userbooks/?user=' + payload.userId + '&bookshelf=' + payload.bookShelf + '&page=' +
          '' + payload.page + ((payload.sort) ? ('&o=' + payload.sort) : '')
      }
      await fetch(url)
        .then(response => {
          return response.json()
        })
        .then(userBooks => {
          if (payload.next) {
            context.commit('addUserBooks', userBooks)
          } else {
            context.commit('getUserBooks', userBooks)
          }
        })
    }
  },
  getters: {
    bookShelfs: state => {
      return state.bookShelfs
    },
    getBookShelfById: state => id => {
      return state.bookShelfs.find(item => item.id === parseInt(id))
    }
  }
})

export default store
