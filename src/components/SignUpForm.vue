<template>
  <div>
    <form @submit.prevent="inscrire" class="form">
      <div class="mb-6">
        <input
          v-model="username"
          required
          class="custom-input"
          placeholder="Votre nom d'utilisateur"
        />
      </div>

      <div class="mb-6">
        <input
          type="password"
          v-model="password"
          required
          class="custom-input"
          placeholder="Password"
        />
      </div>

      <button type="submit" class="submit-btn">S'inscrire</button>
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
