<script>
export default {
  name: 'Mixins',
  methods: {
    /*
    * getUserBooks() получает книги, основываясь на атрибуты, и записывает их в store.userBooks
    * @params <Number> page
    * @params <String> sort
    * @params <String> next
    * */
    getUserBooks ({page = 1, sort = null, next = null} = {}) {
      this.$store.dispatch('getUserBooks', {
        userId: this.$store.state.userId,
        bookShelf: this.$store.state.currentBookShelf.id,
        page: page,
        sort: sort,
        next: next
      })
    }
  }
}
</script>
