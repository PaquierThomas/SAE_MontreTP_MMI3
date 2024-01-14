<template>
  <Header />
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
          <strong>Prix de la montre:</strong> {{ article.PrixTotal }} €
        </p>
        <hr />
      </li>
    </ul>
    <p v-else>Aucun article dans le panier.</p>
    <p v-if="totalPanier !== undefined"><strong>Total du panier:</strong> {{ totalPanier }} €</p>
    <button @click="supprimerPanier">Supprimer le panier</button>
    <button @click="acheterPanier">Valider le panier</button>
  </div>
  <Footer />
</template>

<script setup>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>

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
  computed: {
    // Propriété calculée pour calculer le total du panier
    totalPanier() {
      return this.panier.reduce((total, article) => {
        // Assurez-vous que le prix total de l'article est défini
        if (article.PrixTotal !== undefined) {
          return total + article.PrixTotal
        } else {
          return total
        }
      }, 0)
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
    },
    async supprimerPanier() {
      try {
        const response = await fetch(`http://localhost:4000/api/panier/${this.user_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })

        if (response.ok) {
          // Affiche une boîte de dialogue d'alerte si la suppression est réussie
          alert('Panier supprimé avec succès.')

          // Mettez à jour localement la liste des articles du panier, par exemple :
          this.panier = []
        } else {
          console.error('Erreur lors de la suppression du panier')
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du panier', error)
      }
    },
    async acheterPanier() {
      try {
        const response = await fetch(`http://localhost:4000/api/panier/${this.user_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })

        if (response.ok) {
          // Affiche une boîte de dialogue d'alerte si la suppression est réussie
          alert('Votre achat est un succès.')

          // Mettez à jour localement la liste des articles du panier, par exemple :
          this.panier = []
        } else {
          console.error('Erreur lors de la suppression du panier')
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du panier', error)
      }
    }
  }
}
</script>
