<template lang="pug">
  .task
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
  }
}
</script>


<style lang="scss" scoped>
  .task-checkbox {
    margin-left: 5px;
    margin-right: 5px;
  }

  .task-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: .5rem;
    height: .5rem;
  }

  .task-title {
    font-weight: 500;
    font-size: 16px;
  }

  .task-description {
    font-size: 12px;
  }
</style>
