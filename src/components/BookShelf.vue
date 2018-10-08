<template>
  <div class="books">
    <div class="book" v-for="(item, idx) in this.$store.state.userBooks.objects" :key="idx">
      <img class="book__cover" :src="item.work.cover" :alt="item.work.title">
      <div class="book__title">{{ item.work.title }}</div>
      <div class="book__author">{{ item.work.authors_titles }}</div>
      <div class="book__rating">{{ item.work.rating.score }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookShelf'
}
</script>

<style>
.books{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.book {
  text-align: center;
  flex: 0 0 200px;
  margin: 0 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.book__cover {
  max-width: 200px;
}
</style>
