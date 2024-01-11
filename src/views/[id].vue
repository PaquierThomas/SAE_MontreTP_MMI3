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
    <div class="form">
      <h2>Modifier la configuration</h2>
      <form @submit.prevent="updateMontreConfig" class="column-form">
        <label>Nom de la montre</label>
        <input v-model="updatedConfig.watch_name" type="text" placeholder="watch_name" />
        <label>Boitier</label>
        <div style="display: flex; flex-direction: row">
          <input type="radio" id="optionC1" name="case" value="1" v-model="updatedConfig.case_id" />
          <label for="optionC1">Vert</label>
          <input type="radio" id="optionC2" name="case" value="2" v-model="updatedConfig.case_id" />
          <label for="optionC2">Rouge</label>
          <input type="radio" id="optionC3" name="case" value="3" v-model="updatedConfig.case_id" />
          <label for="optionC3">Noir</label>
        </div>

        <label>Cadran</label>
        <div style="display: flex; flex-direction: row">
          <input type="radio" id="optionB1" name="dial" value="1" v-model="updatedConfig.dial_id" />
          <label for="optionB1">Polymere</label>
          <input type="radio" id="optionB2" name="dial" value="2" v-model="updatedConfig.dial_id" />
          <label for="optionB2">Argent</label>
          <input type="radio" id="optionB3" name="dial" value="3" v-model="updatedConfig.dial_id" />
          <label for="optionB3">Or</label>
        </div>
        <label>Pierres précieuse</label>

        <div style="display: flex; flex-direction: row">
          <input
            type="radio"
            id="optionS1"
            name="stones"
            value="1"
            v-model="updatedConfig.stones_id"
          />
          <label for="optionS1">Rubis</label>
          <input
            type="radio"
            id="optionS2"
            name="stones"
            value="2"
            v-model="updatedConfig.stones_id"
          />
          <label for="optionS2">Diamant</label>
          <input
            type="radio"
            id="optionS3"
            name="stones"
            value="3"
            v-model="updatedConfig.stones_id"
          />
          <label for="optionS3">Emeraude</label>
          <input
            type="radio"
            id="optionS4"
            name="stones"
            value="4"
            v-model="updatedConfig.stones_id"
          />
          <label for="optionS4">Saphir</label>
          <input
            type="radio"
            id="optionS5"
            name="stones"
            value="5"
            v-model="updatedConfig.stones_id"
          />
          <label for="optionS5">Topaze</label>
        </div>
        <label>Type de bracelet</label>

        <div style="display: flex; flex-direction: row">
          <input
            type="radio"
            id="optionBracelet1"
            name="bracelet"
            value="1"
            v-model="updatedConfig.bracelet_id"
          />
          <label for="optionBracelet1">Metal</label>
          <input
            type="radio"
            id="optionBracelet2"
            name="bracelet"
            value="2"
            v-model="updatedConfig.bracelet_id"
          />
          <label for="optionBracelet2">Cuir</label>
          <input
            type="radio"
            id="optionBracelet3"
            name="bracelet"
            value="3"
            v-model="updatedConfig.bracelet_id"
          />
          <label for="optionBracelet3">Tissu</label>
        </div>

        <button type="submit">Enregistrer</button>
        <button @click="deleteMontre">Supprimer cette montre</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      montreDetails: null,
      updatedConfig: {
        watch_name: '',
        case_id: '',
        dial_id: '',
        stones_id: '',
        bracelet_id: ''
      }
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
    },
    async updateMontreConfig() {
      try {
        const configId = this.$route.params.configId
        const response = await axios.put(
          `http://localhost:4000/montres/${configId}`,
          this.updatedConfig
        )
        console.log(response.data) // Affiche la réponse du serveur après la mise à jour
        // Tu peux rediriger l'utilisateur ou faire d'autres actions après la mise à jour réussie
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la configuration de la montre:', error)
      }
    },
    async deleteMontre() {
      try {
        const configId = this.$route.params.configId
        const response = await axios.delete(`http://localhost:4000/montres/${configId}`)
        console.log(response.data) // Réponse du serveur après la suppression

        // Rediriger l'utilisateur ou effectuer d'autres actions après la suppression réussie
        this.$router.push('/montres')
      } catch (error) {
        console.error('Erreur lors de la suppression de la montre:', error)
        // Gérer l'erreur, afficher un message à l'utilisateur, etc.
      }
    }
  }
}
</script>

<style scoped>
.form {
  margin-top: 100px;
  h2 {
    margin-bottom: 10px;
  }
}
.column-form {
  display: flex;
  flex-direction: column;
  gap: 5px;

  input[type='text'],
  button {
    max-width: 200px;
  }
}
</style>
