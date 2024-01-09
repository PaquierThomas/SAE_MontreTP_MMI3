<template>
  <div>
    <h1>Inscription</h1>
    <form @submit.prevent="inscrire">
      <label>Nom d'utilisateur:</label>
      <input v-model="username" required />

      <label>Mot de passe:</label>
      <input type="password" v-model="password" required />

      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      user_id: ''
    }
  },
  methods: {
    inscrire() {
      axios
        .post('http://localhost:4000/signup', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          // Après avoir reçu la réponse du serveur confirmant l'inscription réussie
          this.$emit('signup-success', response.data.user_id)
        })
        .catch((error) => {
          console.error("Erreur lors de l'inscription", error)
        })
    }
  }
}
</script>

<style></style>
