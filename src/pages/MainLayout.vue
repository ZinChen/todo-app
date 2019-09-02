<template lang="pug">
.main-c
  .header-c
    slot(name="header")
      date-toggle
  .body-c
    slot(name="body")
</template>

<script>
import DateToggle from '../components/DateToggle.vue'

export default {
  name: 'main-layout',
  components: {
    DateToggle
  },
}
</script>

<style lang="scss" scoped>
  @import '../styles/main-layout';
</style>
