<template>
  <div>
    <h1>Liste des Montres</h1>
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
      <button @click="ajouterAuPanier(montre.MontreID)">Ajouter au Panier</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      montres: []
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
    ajouterAuPanier(config_id, user_id) {
      const token = localStorage.getItem('token')
      // Vérif utilisateur
      if (!token) {
        // Redirect utilisateur to connexion
        this.$router.push('/connexion')
        return
      }
      const headers = { Authorization: token }
      // Envoyer la requête pour ajouter la montre au panier
      axios
        .post(
          'http://localhost:4000/panier/add',
          {
            user_id: user_id,
            config_id: config_id
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

<style scoped>
/* Styles CSS pour la liste des montres */
.montre {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
