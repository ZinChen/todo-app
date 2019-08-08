<template lang="pug">
  .task(
    @click="deleteItem"
  )
    .task-icon.icon
      i.ion-calendar(v-if="scheduled")
      i.ion-android-time(v-else)
    .task-checkbox
      input(
        :id="idAttr",
        :name="itemId"
        type="checkbox",
      )
    .task-content
      .task-title {{ title }}
      .task-description {{ description }}
</template>


<script>
export default {
  name: 'todo-item',
  props: {
    itemId: [String, Number],
    title: String,
    description: String,
    scheduled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    idAttr() {
      return `item-${this.itemId}`
    }
  },
  methods: {
    openItem() {
      // redirect on page /new
    },
    deleteItem() {
      this.$store.commit('deleteTodo', this.itemId)
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../styles/todo-item';
</style>
