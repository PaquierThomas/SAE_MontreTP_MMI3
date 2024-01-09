<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="connecter">
      <label>Nom d'utilisateur:</label>
      <input v-model="username" required />

      <label>Mot de passe:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    connecter() {
      axios
        .post('http://localhost:4000/login', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          // Une fois la connexion réussie et que vous avez reçu la réponse du serveur
          this.$emit('login-success', response.data.user_id, response.data.token)
          this.$router.push('/')
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion', error)
        })
    }
  }
}
</script>

<style></style>
