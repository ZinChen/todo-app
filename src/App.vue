<template lang="pug">
#app
  .main-c
    .header-c
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
    .body-c
      .task-c
        todo-item(
          itemId=1,
          title="Develop TODO App",
          description="Create first page"
          :scheduled="true"
        )

        todo-item(
          itemId=1,
          title="Daily excercise",
          description="Do gym"
        )

      .create-task-c
        .create-task.task
          .create-task-icon.icon.icon-is-medium
            i.ion-plus-round
</template>

<script>
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'app',
  components: {
    TodoItem,
  }
}
</script>

<style lang="scss">
  .task {
    position: relative;
    display: flex;
    align-items: center;
    height: 55px;
    margin-bottom: 10px;
    padding: 10px 5px;
    border: 1px solid #00B2FE;
    border-radius: 10px;
    line-height: 1.2;
  }
</style>


<style lang="scss" scoped>
.main-c {
  width: 320px;
  margin: 20px auto;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 30px;
  border: 1px solid #00B2FE;
  border-radius: 20px;
}

.header-c {
  margin-bottom: 20px;
}

.date-toggle-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.date-val {
  font-size: 16px;
  line-height: 1;
}

.month-val {
  font-size: 10px;
  line-height: 1;
}

.prev-arrow,
.next-arrow {
  padding: 0 15px;
}

.current-date {
  // text-transform: uppercase;
}

.body-c {
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.task-c {
  flex: 1;
}

.create-task {
  display: flex;
  // justify-content: flex-end;
  justify-content: center;
}

.create-task-icon {
  // margin-right: 10px;
  line-height: 1;
  color: #fff;
  background: #00B2FE;
  // border: 1px solid #00B2FE;
  border-radius: 50%;
}
</style>
