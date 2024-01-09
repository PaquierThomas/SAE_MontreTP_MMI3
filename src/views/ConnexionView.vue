<template>
  <div>
    <SignUpForm @signup-success="handleSignUpSuccess" />
    <LoginForm @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'

export default {
  components: {
    SignUpForm,
    LoginForm
  },
  methods: {
    handleSignUpSuccess(user_id) {
      console.log('Inscription réussie, ID utilisateur:', user_id)
      // Traiter la réussite de l'inscription ici si nécessaire
    },
    handleLoginSuccess(user_id, token) {
      console.log('Connexion réussie, ID utilisateur:', user_id)
      // Stocker le token dans le stockage local
      localStorage.setItem('token', token)
      // Traiter la réussite de la connexion ici si nécessaire
    }
  }
}
</script>
