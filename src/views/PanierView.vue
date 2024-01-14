<template>
  <div>
    <h1>Liste du Panier</h1>
    {{ user_id }}

    <ul v-if="panier.length > 0">
      <li v-for="article in panier" :key="article.PanierID">
        <p><strong>Nom Montre:</strong> {{ article.NomMontre }}</p>
        <p><strong>Nom Boitier:</strong> {{ article.NomBoitier }}</p>
        <p><strong>Texture Boitier:</strong> {{ article.TextureBoitier }}</p>
        <p><strong>Quantité:</strong> {{ article.Quantite }}</p>
        <p v-if="article.PrixTotal !== undefined">
          <strong>Prix Total:</strong> {{ article.PrixTotal }} €
        </p>
        <hr />
      </li>
    </ul>

    <p v-else>Aucun article dans le panier.</p>
  </div>
</template>

<script>
import axios from 'axios'
const token = localStorage.getItem('token')

export default {
  data() {
    return {
      panier: [],
      user_id: token
    }
  },
  mounted() {
    // Récupérer l'ID de l'utilisateur à partir de l'URL
    const userId = this.$route.params.userId

    // Appeler la nouvelle API pour récupérer le panier de l'utilisateur connecté lors du chargement du composant
    this.fetchPanier(userId)
  },
  methods: {
    async fetchPanier(userId) {
      try {
        const response = await fetch(`http://localhost:4000/api/panier/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Réponse JSON du serveur:', data)
          this.panier = data
        } else {
          console.error('Erreur lors de la récupération du panier')
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du panier', error)
      }
    }
  }
}
</script>
