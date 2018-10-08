<template>
  <div>
    <ul class="sort">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        :class="`sort__item ${(sort === item.sort) ? 'is-active' : null}`"
        @click="handleClick(item.sort)">
        <span class="sort__item-text is-active">
          {{ item.text }}
          <template v-if="$store.state.sort === item.sort"> ↑</template>
          <template v-if="$store.state.sort === '-' + item.sort"> ↓</template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Mixins from '@/mixins'
export default {
  name: 'Sort',
  mixins: [Mixins],
  data () {
    return {
      sort: 'created',
      items: [
        {
          sort: 'created',
          text: 'По дате добавления'
        },
        {
          sort: 'work__default_edition__title',
          text: 'По названию'
        },
        {
          sort: 'work__rating_score',
          text: 'По общему рейтингу'
        }
      ]
    }
  },
  created () {
    if (this.$route.query.sort) {
      this.$store.commit('toggleSort', this.$route.query.sort)
      this.sort = this.$store.state.sort.replace('-', '')
    }
  },
  methods: {
    handleClick (sort) {
      this.sort = sort
      this.$store.commit('toggleSort', sort)
      this.getUserBooks({
        sort: this.$store.state.sort
      })
      this.$router.push({
        query: {
          ...this.$route.query,
          sort: this.$store.state.sort
        }
      })
    }
  }
}
</script>
<style>
.sort {
  display: block;
  height: 40px;
  margin: 0 0 20px 10px;
  padding: 0;
}
.sort__item {
  position: relative;
  display: inline-block;
  padding: 0 20px;
  vertical-align: top;
  background-color: #f4f4f4;
  line-height: 40px;
  cursor: pointer;
}
.sort__item.is-active {
  background-color: transparent;
}
</style>
