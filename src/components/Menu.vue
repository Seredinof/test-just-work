<template>
  <nav>
    <ul class="menu">
      <template v-for="(item, idx) in this.bookShelfs">
        <li class="menu__item" :key="idx">
          <router-link
            :to="{name: 'BookShelf', params:{ shelfId: item.id }}"
          >{{ item.name }}
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    bookShelfs: {
      type: Array
    }
  }
}
</script>
<style>
  .menu {
    margin: 0;
    padding: 0;
    display: flex;
  }
  .menu__item {
    list-style: none;
    margin: 0 10px 0;
  }
  .menu__item a {
    color: #333;
    text-decoration: none;
  }
  .menu__item a:hover {
    color: #0088a0;
  }
  a.router-link-active {
    text-decoration: underline;
    cursor: default;
    color: #0088a0;
  }
</style>
