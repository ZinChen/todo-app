<template lang="pug">
main-layout
  template(v-slot:body)
    .form
      .field
        .control
          button.button.is-danger(
            @click="deleteAllTodos"
          ) Удалить все задачи
      .field
        .control
          button.button.is-link(
            @click="downloadAllTodos"
          ) Скачать все задачи
</template>

<script>
import MainLayout from './MainLayout.vue'
import { saveFile } from '../common/lib'

export default {
  name: 'special',
  components: { MainLayout },
  methods: {
    deleteAllTodos() {
      if(confirm('Удалить все задачи? Точно?!')) {
        this.$store.dispatch('deleteAllTodos')
      }
    },
    downloadAllTodos() {
      this.$store.state.todosRef.get()
        .then(snap => {
          const result = {}
          snap.docs.map(doc => result[doc.id] = doc.data())
          const date = new Date()
          saveFile(result, 'todos ' + date.toJSON())
        })

      return true
    },
  }
}
</script>
