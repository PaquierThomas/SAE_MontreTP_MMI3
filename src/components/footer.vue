<template>
  <!-- Footer -->
  <footer class="footer-container">
    <div class="footer-content">
      <div class="grid">
        <div class="site-map">
          <h2 class="section-title">Plan du site</h2>
          <ul class="section-list">
            <li class="list-item">
              <a href="/" class="list-link">Accueil</a>
            </li>
            <li class="list-item">
              <a href="/add-watch" class="list-link">Personnaliser</a>
            </li>
            <li class="list-item">
              <a href="/montres" class="list-link">Montres</a>
            </li>
            <li class="list-item">
              <a href="/connexion" class="list-link">Se connecter</a>
            </li>
          </ul>
        </div>
        <div class="legal-info">
          <h2 class="section-title">Parties légales</h2>
          <ul class="section-list">
            <li class="list-item">
              <a href="#" class="list-link">Mentions légales</a>
            </li>
            <li class="list-item">
              <a href="#" class="list-link">Politique de confidentialité</a>
            </li>
            <li class="list-item">
              <a href="#" class="list-link">Conditions d'utilisation</a>
            </li>
            <li class="list-item">
              <a href="#" class="list-link">Conditions générales de vente</a>
            </li>
          </ul>
        </div>
        <div class="legal-info">
          <h2 class="section-title">Parties tierce</h2>
          <ul class="section-list">
            <li class="list-item">
              <a href="#" class="list-link" @click="deconnecter">Se déconnecter</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-logo">
        <a href="/" class="logo-link">
          <img src="/image/Logo.svg" class="logo-img" alt="TikTak Logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
/* Styles pour le conteneur du footer */
.footer-container {
  padding: 3rem;
  background-color: #000000;
  margin-top: 3rem;
}

/* Styles pour le contenu du footer */
.footer-content {
  display: flex;
  justify-content: space-between;
}
.grid {
  display: grid;
  margin-top: 2rem;
  margin-left: 3rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}
/* Styles pour la section du plan du site */
.site-map,
.legal-info {
  margin-right: 3rem;
}

/* Styles pour le titre de section */
.section-title {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #dd6b20;
  text-transform: uppercase;
  font-family: $primary-font-family;
}

/* Styles pour la liste des liens */
.section-list {
  list-style-type: none;
  padding: 0;
}

/* Styles pour les éléments de liste */
.list-item {
  margin-bottom: 1rem;
}

/* Styles pour les liens */
.list-link {
  text-decoration: none;
  color: #f7fafcad;
  font-family: $primary-font-family;
}
.list-link:hover {
  text-decoration: underline;
  color: #dd6b20;
}

/* Styles pour le logo */
.footer-logo {
  margin-bottom: 3rem;
}

/* Styles pour le lien du logo */
.logo-link {
  display: flex;
  align-items: center;
}

/* Styles pour l'image du logo */
.logo-img {
  margin-right: 12rem;
  margin-top: 2.5rem;
  height: 100%;
}
</style>

<script>
export default {
  methods: {
    deconnecter() {
      // Efface le token du stockage local
      localStorage.removeItem('token')
      console.log('Déconnexion réussie')
    }
  }
}
</script>
