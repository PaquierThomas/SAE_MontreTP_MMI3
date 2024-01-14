<template class="bg">
  <Header />
  <div class="bg">
    <div class="container">
      <h2 class="title">Liste de vos montres</h2>
      <img class="image" src="/image/montre.webp" alt="image montre fond" />
    </div>
    <div>
      <h2 class="title2">Consultez vos créations</h2>
      <div class="montres-grid">
        <div v-for="montre in montres" :key="montre.config_id" class="montre">
          <!-- <p>ID: {{ montre.config_id }}</p> -->
          <div>
            <p>Nom de la montre:</p>
            <p>{{ montre.watch_name }}</p>
          </div>
          <div>
            <p>Prix:</p>
            <p>{{ montre.price }} €</p>
          </div>
          <div>
            <p>Boîtier:</p>
            <p>{{ montre.case_name }}</p>
          </div>
          <div>
            <p>Cadran:</p>
            <p>{{ montre.dial_name }}</p>
          </div>
          <div>
            <p>Pierres:</p>
            <p>{{ montre.stones_name }}</p>
          </div>
          <div>
            <p>Bracelet:</p>
            <p>{{ montre.bracelet_name }}</p>
          </div>
          <!-- <div>
            <p>Prix métal:</p>
            <p>{{ montre.metal_price }}</p>
          </div>
          <div>
            <p>Prix cuir:</p>
            <p>{{ montre.leather_price }}</p>
          </div>
          <div>
            <p>Prix tissu:</p>
            <p>{{ montre.fabric_price }}</p>
          </div> -->
          <div class="buttons-container">
            <button @click="ajouterAuPanier(montre.config_id)">Ajouter au Panier</button>
            <button @click="viewMontreDetails(montre.config_id)">Modifier</button>
          </div>
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
  </div>
  <Footer class="footer" />
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
$color-primary: white;
$color-secondary: black;

.footer {
  margin: 0;
}
.bg {
  background: #000000;
  border-bottom: 2px solid $color-primary;
  padding-bottom: 20px;
}
.montres-grid {
  display: grid;
  margin: 0 2rem;

  grid-template-columns: repeat(
    auto-fill,
    minmax(350px, 1fr)
  ); /* Définir la largeur minimale et maximale des colonnes */
  gap: 20px; /* Espacement entre les éléments de la grille */
}

/* Styles CSS pour la liste des montres */

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
  color: $color-primary;
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
  color: $color-primary;
}

.highlight-text {
  color: #ff7e00; /* Couleur orange */
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

.montre {
  border: 4px solid $color-primary;
  padding: 20px;
  margin-bottom: 10px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: $primary-font-family;
    margin-bottom: 5px;
  }
  p:first-child {
    color: $color-primary;
    text-transform: uppercase;
    font-weight: bold;
    padding-right: 10px;
    // width: 200px;
    // box-sizing: border-box;
  }
  p:last-child {
    color: $color-primary;
    font-size: 16px;
    font-weight: bold;
    text-align: right;
    text-transform: capitalize;

    // width: 200px;
    // box-sizing: border-box;
  }
  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 0;
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
}
</style>
