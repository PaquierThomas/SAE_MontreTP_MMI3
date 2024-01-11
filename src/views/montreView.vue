<template>
  <Header />
  <div class="container">
    <h2 class="title">Liste de vos montres</h2>
    <img class="image" src="/image/montre.webp" alt="image montre fond" />
  </div>

  <div>
    <h2 class="title2">Consultez vos créations</h2>
    <div class="montres-grid">
      <div v-for="montre in montres" :key="montre.config_id" class="montre">
        <p>ID: {{ montre.config_id }}</p>
        <h2>Nom: {{ montre.watch_name }}</h2>
        <p>Prix: {{ montre.price }}</p>
        <p>Boîtier: {{ montre.case_name }}</p>
        <p>Cadran: {{ montre.dial_name }}</p>
        <p>Pierres: {{ montre.stones_name }}</p>
        <p>Bracelet: {{ montre.bracelet_name }}</p>
        <p>Prix métal: {{ montre.metal_price }}</p>
        <p>Prix cuir: {{ montre.leather_price }}</p>
        <p>Prix tissu: {{ montre.fabric_price }}</p>
        <button @click="viewMontreDetails(montre.config_id)">Voir détails</button>
        <button @click="ajouterAuPanier(montre.config_id)">Ajouter au Panier</button>
      </div>
    </div>
  </div>
  <div class="grid-container">
    <p class="custom-message">
      Vous ne trouvez pas de montre? <span class="highlight-text">Customisez</span> la vôtre!
    </p>
    <div class="custom-button">
      <a href="/add-watch"><span class="button-text">Customiser</span></a>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      montres: [],
      addCart: {
        user_id: '',
        config_id: '',
        cart_id: ''
      }
    }
  },
  created() {
    this.getAllMontres()
  },
  methods: {
    async getAllMontres() {
      try {
        const response = await axios.get('http://localhost:4000/montres')
        this.montres = response.data.montres || []
      } catch (error) {
        console.error('Erreur lors de la récupération des montres:', error)
      }
    },

    viewMontreDetails(id) {
      // Redirection vers la page de détails de la montre avec l'ID spécifique
      console.log('Id de la montre', id)
      this.$router.push({ name: 'MontreDetails', params: { configId: id } })
    },
    ajouterAuPanier(configId) {
      const token = localStorage.getItem('token')
      // Vérifier si l'utilisateur est connecté
      if (!token) {
        // Rediriger l'utilisateur vers la page de connexion
        this.$router.push('/connexion')
        return
      }
      console.log('config_id:', configId)
      console.log('user_id:', token)

      const headers = { Authorization: token }

      axios
        .post(
          'http://localhost:4000/panier/add',
          {
            config_id: configId,
            user_id: token
          },
          { headers: headers }
        )
        .then((response) => {
          console.log(response.data.message)
          alert('Montre ajoutée au panier avec succès!')
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la montre au panier", error.response.data.error)
          alert("Erreur lors de l'ajout de la montre au panier. Veuillez réessayer.")
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.montres-grid {
  display: grid;
  margin: 0 2rem;

  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* Définir la largeur minimale et maximale des colonnes */
  gap: 20px; /* Espacement entre les éléments de la grille */
}
/* Styles CSS pour la liste des montres */
.montre {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.container {
  position: relative;
  width: 100vw;
}

.title {
  position: absolute;
  margin-left: 3rem;
  margin-top: 8rem;
  align-items: center;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  font-family: $primary-font-family;
}

.title2 {
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: 1.5rem;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  font-family: $primary-font-family;
}
.image {
  width: 100vw;
}

.grid-container {
  display: grid;
  place-items: center;
  margin-top: 32px;
  font-family: $primary-font-family;
  text-decoration: none;
}

.custom-message {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}

.highlight-text {
  color: #ff7e00; /* Couleur orange */
}

.custom-button {
  position: relative;
  background-color: #000; /* Couleur noir */
  width: 16.66667%; /* 1/6 de la largeur parente */
  height: 3.5rem; /* Hauteur fixe */
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
  color: #fff;
}
</style>
