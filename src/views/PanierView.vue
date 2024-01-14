<template>
  <div>
    <h1>Liste du Panier</h1>

    <!-- <ul v-if="panier.length > 0">
      <li v-for="article in panier" :key="article.PanierID">
        <p><strong>Nom Montre:</strong> {{ article.NomMontre }}</p>
        <p><strong>Nom Boitier:</strong> {{ article.NomBoitier }}</p>
        <p><strong>Texture Boitier:</strong> {{ article.TextureBoitier }}</p>
        <p><strong>Quantité:</strong> {{ article.Quantite }}</p>
        <p><strong>Prix Total:</strong> {{ article.PrixTotal }} €</p>
        <hr />
      </li>
    </ul>

    <p v-else>Aucun article dans le panier.</p> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      paniers: []
    }
  },
  mounted() {
    const token = localStorage.getItem('token')

    // Vérifier si l'utilisateur est connecté
    if (!token) {
      alert('Vous devez être connecté pour voir le panier.')
      // Rediriger l'utilisateur vers la page de connexion
      this.$router.push('/connexion')
      return
    }

    // Configurer le header avec le token
    const headers = { Authorization: token }

    // Envoyer la requête pour récupérer la liste du panier
    axios
      .get('http://localhost:4000/panier/liste', { headers })
      .then((response) => {
        this.paniers = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du panier', error)
        alert('Erreur lors de la récupération du panier. Veuillez réessayer.')
      })
  }
}
</script>
