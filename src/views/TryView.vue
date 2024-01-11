<template>
  <section class="full-height">
    <div class="custom-container">
      <div class="flex-container">
        <div class="left-content">
          <div class="mb-10">
            <a href="/"
              ><img class="mb-6 ml-img" src="/image/Logo_noir.svg" alt="logo du site"
            /></a>
            <h2 class="title">Content de vous revoir!</h2>
          </div>
          <form class="form">
            <!-- Adresse mail -->
            <SignUpForm @signup-success="handleSignUpSuccess" />

            <div class="flex-divider">
              <p class="centered-text">OU</p>
            </div>

            <LoginForm @login-success="handleLoginSuccess" />

            <div class="options">
              <div class="form-check">
                <input type="checkbox" class="custom-checkbox" id="exampleCheck3" checked />
                <label class="check-label">Se souvenir de moi</label>
              </div>
              <a href="#!" class="forgot-password">Mot de passe oublié?</a>
            </div>

            <!-- Bouton de connexion
            <button type="submit" class="submit-btn">Se connecter</button> -->
          </form>
        </div>
        <!-- Image -->
        <div class="right-content">
          <img
            src="/image/montre_connexion.webp"
            class="full-width"
            alt="image montre connecte connexion"
          />
        </div>
      </div>
    </div>
  </section>
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

<style lang="scss">
/* Styles pour la section */
.full-height {
  height: 100vh;
}

/* Styles pour le conteneur personnalisé */
.custom-container {
  padding: 3rem;
  height: 100%;
}

/* Styles pour le conteneur flex */
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  color: black;
  width: 92%;
  height: 94%;
  border-width: 4px;
  border-style: solid;
  border-color: #f59e0b;
  border-radius: 1rem;
}

/* Styles pour le contenu de gauche */
.left-content {
  width: 30%;
  // margin-left: 10%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.form {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

/* Styles pour les images */
.ml-img {
  margin-left: -40px;
  margin-bottom: 20px;
}

/* Styles pour les titres */
.title {
  font-weight: 600;
  font-size: 2.5rem;
  font-family: $primary-font-family;
}

/* Styles pour le texte */
.medium-text {
  font-weight: 500;
  font-size: 1.5rem;
  font-family: $primary-font-family;
}

/* Styles pour le diviseur */
.flex-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin: 8px 0;
  font-family: $primary-font-family;
}

/* Styles pour le texte centré */
.centered-text {
  font-weight: 600;
  text-align: center;
}

.options {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
}

/* Styles pour le label du formulaire */
.check-label {
  font-weight: 700;
  color: #4b5563;
  display: inline-block;
  margin-bottom: 0;
  font-family: $primary-font-family;
}

/* Styles pour le bouton de soumission */
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

/* Styles pour l'image */
.right-content {
  width: 41%;
  // margin-top: 1px;
  margin-left: 13.48rem;
  z-index: -2;
}

/* Styles pour les inputs */
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

/* Styles pour la case à cocher */
.custom-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

/* Styles pour le lien "Mot de passe oublié?" */
.forgot-password {
  color: black;
  transition: color 0.3s ease-in-out;
  font-family: $primary-font-family;
}

/* Styles pour les effets de survol des boutons */
.submit-btn:hover {
  background-color: #f59e0b;
  color: white;
}
.forgot-password:hover {
  color: #f59e0b;
}
</style>
