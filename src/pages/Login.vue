<template lang="pug">
  main-layout
    template(v-slot:header)
      div login
    template(v-slot:body)
      .login-title Login with:
      button.login-button.button.is-link(
        @click="loginWithFacebook"
      ) Facebook
      button.login-button.button.is-dark(
        @click="loginWithGoogle"
      ) Google
</template>

<script>
import MainLayout from './MainLayout.vue'
import firebase from 'firebase'
import { Auth } from '../common/auth'

export default {
  name: 'login',
  components: {
    MainLayout
  },
  beforeCreate: function() {
    this.auth = new Auth(this)
  },
  methods: {
    loginWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider()
      this.auth.handleFirebaseAuth(provider)
    },
    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()

      this.auth.handleFirebaseAuth(provider)
    }
  },
}
</script>

<style lang="scss" scoped>
  .login-button {
    margin-bottom: 10px;
  }
</style>


