<template>
  <div>
    <!-- Votre contenu de page ici -->
    <button @click="deconnecter">Déconnexion</button>
  </div>
</template>

<script>
export default {
  methods: {
    deconnecter() {
      // Efface le token du stockage local
      localStorage.removeItem('token')
      // Vous pouvez également effectuer d'autres actions nécessaires pour la déconnexion
      // Redirection vers la page de connexion, etc.
    }
  }
}
</script>
