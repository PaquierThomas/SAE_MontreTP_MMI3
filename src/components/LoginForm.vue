<template>
  <div>
    <form @submit.prevent="connecter" class="form">
      <input
        v-model="username"
        required
        type="text"
        class="custom-input"
        placeholder="Votre adresse mail"
      />

      <input
        type="password"
        v-model="password"
        required
        class="custom-input"
        placeholder="Votre mot de passe"
      />

      <button type="submit" class="submit-btn">Se connecter</button>
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

<style lang="scss">
.form {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.custom-input {
  display: block;
  width: 95%;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: 400;
  border-radius: 0.35rem;
  color: black;
  background-color: white;
  background-clip: padding-box;
  border-width: 2px;
  border-style: solid;
  border-color: black;
  transition: all 0.3s ease-in-out;
  margin: 0;
  font-family: $primary-font-family;
}

.submit-btn {
  display: inline-block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  border-radius: 0.25rem;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  line-height: 1.375;
  font-family: $primary-font-family;

  border: #000000;
  color: #ffffff;
  text-transform: uppercase;
  background-color: #000000;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
