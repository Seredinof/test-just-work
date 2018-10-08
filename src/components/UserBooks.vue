<template>
  <div>
    <Menu :bookShelfs="bookShelfs"/>
    <Title/>
    <Sort/>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './Menu'
import Title from './Title'
import Sort from './Sort'
import Mixins from '@/mixins'
export default {
  name: 'UserBooks',
  mixins: [Mixins],
  components: { Menu, Title, Sort },
  computed: {
    ...mapGetters(['bookShelfs', 'getBookShelfById'])
  },
  watch: {
    '$route.params.shelfId': function (to) {
      this.$store.commit('setCurrentBookShelf', this.getBookShelfById(to))
      this.getUserBooks({sort: (this.$store.state.sort) || null})
    }
  },
  async created () {
    await this.$store.dispatch('getBookShelfs', this.$store.state.userId)

    // При загрузке делаем активным нулевой пункт меню и выставляем соответствующий роут
    if (!this.$route.params.shelfId) {
      this.$store.commit('setCurrentBookShelf', this.$store.state.bookShelfs[0])
      this.$router.push({
        name: 'BookShelf',
        params: {
          shelfId: this.$store.state.currentBookShelf.id
        }
      })
    } else {
      this.$store.commit('setCurrentBookShelf', this.getBookShelfById(this.$route.params.shelfId))
    }
    this.getUserBooks({sort: (this.$store.state.sort) || null})

    // Слушаем событие скролла, для LoadMore
    window.onscroll = async () => {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop
      console.log(scrolled, document.documentElement.scrollHeight - document.documentElement.clientHeight)
      if ((document.documentElement.scrollHeight - document.documentElement.clientHeight) - scrolled <= 2 &&
        this.$store.state.userBooks.next) {
        await this.getUserBooks({next: this.$store.state.userBooks.next.replace('http://my-lib.ru', '')})
      }
    }
  }
}
</script>
