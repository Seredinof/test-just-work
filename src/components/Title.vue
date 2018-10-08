<template>
  <div>
    <h2 class="title">{{ (this.$store.state.currentBookShelf) ? this.$store.state.currentBookShelf.name : null }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style>
  .title {
    margin-left: 10px;
  }
</style>
