<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="connecter">
      <label>Nom d'utilisateur:</label>
      <input v-model="connexionNom" required />

      <label>Mot de passe:</label>
      <input type="password" v-model="connexionMotDePasse" required />

      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      connexionNom: '',
      connexionMotDePasse: ''
    }
  },
  methods: {
    connecter() {
      axios
        .post('http://localhost:4000/login', {
          username: this.connexionNom,
          password: this.connexionMotDePasse
        })
        .then((response) => {
          this.$emit('login-success', response.data.user_id, response.data.token)
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion', error)
        })
    }
  }
}
</script>

<style></style>
