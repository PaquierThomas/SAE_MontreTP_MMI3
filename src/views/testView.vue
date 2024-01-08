<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { client, foo } from '../utils/axios'
import axios from 'axios'

const route = useRoute()

const recipe = ref({})

const username = ref('')
const password = ref('')
const message = ref('')

const createAccount = async () => {
  try {
    const response = await axios.post('http://localhost:4000/signup', {
      username: username.value,
      password: password.value
    })
    message.value = response.data.message || 'Compte créé avec succès !'
  } catch (error) {
    console.error('Erreur:', error)
    message.value =
      error.response.data.error || "Une erreur s'est produite lors de la création du compte."
  }
}

// Fonction pour la connexion
const login = async () => {
  try {
    const response = await axios.post('http://localhost:4000/login', {
      username: username.value,
      password: password.value
    })

    // Traitement après la connexion réussie
    if (response.status === 200) {
      message.value = 'Connexion réussie !'
      window.location.href = '/'
    }
  } catch (error) {
    console.error('Erreur:', error)

    // Vérifiez si error.response existe avant d'y accéder
    if (error.response && error.response.data && error.response.data.error) {
      message.value = error.response.data.error
    } else {
      message.value = 'Erreur lors de la connexion.'
    }
  }
}
</script>

<template>
  <div>
    <h1>Créer un nouveau compte</h1>

    <form @submit.prevent="createAccount">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Créer</button>
    </form>

    <div v-if="message">{{ message }}</div>
  </div>
  <!-- Se connecter -->
  <div>
    <h1>Se connecter</h1>

    <form @submit.prevent="login">
      <div>
        <label for="login-username">Nom d'utilisateur:</label>
        <input type="text" id="login-username" v-model="username" />
      </div>
      <div>
        <label for="login-password">Mot de passe:</label>
        <input type="password" id="login-password" v-model="password" />
      </div>
      <button type="submit">Se connecter</button>
    </form>

    <div v-if="message">{{ message }}</div>
  </div>
</template>
