<template lang="pug">
  main-layout
    template(v-slot:header)
      div login
    template(v-slot:body)
      .login-title Login with
      .login-button Facebook
      .login-button Google
</template>

<script>
import MainLayout from './MainLayout.vue'

export default {
  name: 'login',
  components: {
    MainLayout
  }
}
</script>

