<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Reader',
  created () {
    // Для эмуляции юзера и подстановки userId в router
    if (!this.$router.currentRoute.params.userId) {
      this.$router.push({
        name: 'UserBooks',
        params: {
          userId: this.$store.state.userId
        }
      })
    } else {
      this.$store.commit('setUserId', parseInt(this.$router.currentRoute.params.userId))
    }
  }
}
</script>
