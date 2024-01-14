<template>
  <Header class="header" />
  <div class="container">
    <div class="centered-content">
      <h2 class="title">Liste du Panier</h2>
      <ul v-if="panier.length > 0">
        <li v-for="article in panier" :key="article.PanierID">
          <p><strong>Nom Montre:</strong> {{ article.NomMontre }}</p>
          <p><strong>Nom Boitier:</strong> {{ article.NomBoitier }}</p>
          <p><strong>Texture Boitier:</strong> {{ article.TextureBoitier }}</p>
          <p v-if="article.PrixTotal !== undefined">
            <strong>Prix de la montre:</strong> {{ article.PrixTotal }} €
          </p>
          <hr />
        </li>
      </ul>
      <p v-else>Aucun article dans le panier.</p>
      <p class="total highlight-text" v-if="totalPanier !== undefined">
        <strong>Total du panier:</strong> {{ totalPanier }} €
      </p>
      <div class="buttons-container">
        <button @click="supprimerPanier">Supprimer le panier</button>
        <button @click="acheterPanier">Valider le panier</button>
      </div>
    </div>
  </div>
  <Footer class="footer" />
</template>

<style lang="scss" scoped>
$color-primary: white;
$color-secondary: black;

.footer {
  margin: 0;
  border-top: 2px solid $color-primary;
}
.header {
  margin: 0;
  border-bottom: 2px solid $color-primary;
}
.bg {
  background: $color-secondary;
  border-bottom: 2px solid $color-primary;
  padding-bottom: 20px;
}
.montres-grid {
  display: grid;
  margin: 0 2rem;

  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
}

/* Styles CSS pour la liste des montres */
.container {
  position: relative;
  width: 100vw;
  padding: 100px 0;
  padding-bottom: 198px;
  background: $color-secondary;
  // border-bottom: 2px solid $color-primary;
}
.title {
  font-family: $primary-font-family;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin-bottom: 40px;
  font-size: 42px;
  text-transform: uppercase;
  color: $color-primary;
}

ul {
  font-family: $primary-font-family;
  margin-left: 100px;
  ul > li {
    padding-bottom: 10px;
  }
  li p {
    display: flex;
    align-items: flex-start;
  }
  li p strong {
    min-width: 200px; // largeur col
    margin-right: 10px;
  }
}

.total {
  margin-left: 100px;
  margin-top: 20px;
  font-size: 26px;
  font-weight: bold;
  font-family: $primary-font-family;
  color: $color-primary;
}
.highlight-text {
  color: orange; /* ou toute autre couleur souhaitée */
}

p {
  font-family: $primary-font-family;
  color: $color-primary;
  padding-bottom: 5px;
}

strong {
  font-family: $primary-font-family;
  color: $color-primary;
  font-weight: bold;
}
.custom-button {
  position: relative;
  background-color: $color-primary;
  width: 16.66667%;
  height: 3.5rem;
  margin-bottom: 20px;
  border-radius: 10px;
  a {
    text-decoration: none;
  }
}

.button-text {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: $primary-font-family;
  text-transform: uppercase;
  color: $color-secondary;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 0;
  margin-left: 100px;
}
button {
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  outline: none;
  margin: 0;
}
button:last-child {
  background-color: $color-primary;
  color: $color-secondary;
  text-transform: uppercase;
  font-size: 12px;
  padding: 11px;
  box-sizing: border-box;
}
button:last-child:hover {
  color: orange;
}
button:first-child {
  background-color: $color-secondary;
  color: $color-primary;
  border: 2px solid $color-primary;
  padding: 8px;
  box-sizing: border-box;
}
button:first-child:hover {
  background-color: $color-primary;
  color: $color-secondary;
}
</style>

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
