<template>
  <div>
    <h1>Détails de la montre</h1>
    <div v-if="montreDetails">
      <h2>Nom: {{ montreDetails.watch_name }}</h2>
      <p>Prix: {{ montreDetails.price }}</p>
      <p>Boîtier: {{ montreDetails.case_name }}</p>
      <p>Cadran: {{ montreDetails.dial_name }}</p>
      <p>Pierres: {{ montreDetails.stones_name }}</p>
      <p>Bracelet: {{ montreDetails.bracelet_name }}</p>
      <p>Prix métal: {{ montreDetails.metal_price }}</p>
      <p>Prix cuir: {{ montreDetails.leather_price }}</p>
      <p>Prix tissu: {{ montreDetails.fabric_price }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      montreDetails: null
    }
  },
  created() {
    const configId = this.$route.params.configId
    this.getMontreDetails(configId)
  },
  methods: {
    async getMontreDetails(configId) {
      try {
        const response = await axios.get(`http://localhost:4000/montres/${configId}`)
        this.montreDetails = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la montre:', error)
      }
    }
  }
}
</script>
