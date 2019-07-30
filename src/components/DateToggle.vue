<template lang="pug">
  .date-toggle-c
    .prev-date-c
      .date-val 26
      .month-val May
    .prev-arrow.icon
      i.ion-chevron-left
    .current-date
      .current-date-val Today
    .next-arrow.icon
      i.ion-chevron-right
    .next-date-c
      .date-val 28
      .month-val May
</template>

<script>
export default {
  name: 'date-toggle'
}
</script>

<style lang="scss" scoped>
  @import '../styles/date-toggle';
</style>
