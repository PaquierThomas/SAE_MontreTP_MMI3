<template>
  <div>
    <h1>Ajouter une montre</h1>
    <form @submit.prevent="addWatch">
      <label for="userId">ID Utilisateur:</label>
      <select v-model="newWatch.userId" id="userId" name="userId">
        <option value="1">Emma</option>
        <option value="2">Thomas</option>
        <option value="3">William</option></select
      ><br /><br />

      <label for="watchName">Nom de la montre:</label>
      <input v-model="newWatch.watchName" type="text" id="watchName" name="watchName" /><br /><br />

      <label for="caseId">Boîtier:</label>
      <select v-model="newWatch.caseId" id="caseId" name="caseId">
        <option value="" disabled selected hidden>Choisissez un boîtier</option>
        <option value="1" @click="toggleBoitierRond">Rond</option>
        <option value="2" @click="toggleBoitierRond">Carré</option></select
      ><br /><br />

      <label for="dialId">Cadran:</label>
      <select v-model="newWatch.dialId" id="dialId" name="dialId">
        <option value="1" @click="changeTextureBoitierRond('background_black01.png')">
          Classic Black
        </option>
        <option value="2" @click="changeTextureBoitierRond('background_black02.png')">
          Hourless Black
        </option>
        <option value="3" @click="changeTextureBoitierRond('background_fluo01.png')">Fluo</option>
        <option value="4" @click="changeTextureBoitierRond('background_mickey.png')">Mickey</option>
        <option value="5" @click="changeTextureBoitierRond('background_white01.png')">Neon</option>
        <option value="6" @click="changeTextureBoitierRond('background_white02.png')">Clock</option>
        <option value="7" @click="changeTextureBoitierRond('background_white03.png')">
          Classic
        </option>
        <option value="8" @click="changeTextureBoitierRond('background_white05.png')">
          Timeless
        </option></select
      ><br /><br />

      <label for="stonesId">Pierres précieuses:</label>
      <select v-model="newWatch.stonesId" id="stonesId" name="stonesId">
        <option value="1" @click="changePierreColor('rubis')">Rubis</option>
        <option value="2" @click="changePierreColor('diamant')">Diamant</option>
        <option value="3" @click="changePierreColor('émeraude')">Emeraude</option>
        <option value="4" @click="changePierreColor('topaze')">Topaze</option>
        <option value="5" @click="changePierreColor('saphir')">Saphir</option></select
      ><br /><br />

      <label for="braceletId">Bracelet:</label>
      <select v-model="newWatch.braceletId" id="braceletId" name="braceletId">
        <option value="1" @click="changeTexture('texture-tissus-marron.jpg')">Tissu marron</option>
        <option value="2" @click="changeTexture('texture-tissus-or.jpg')">Tissu Or</option>
        <option value="3" @click="changeTexture('texture-cuir-blanc.jpg')">Cuir</option></select
      ><br /><br />

      <label for="price">Prix:</label>
      <input v-model="newWatch.price" type="text" id="price" name="price" /><br /><br />

      <input type="submit" value="Ajouter la montre" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newWatch: {
        userId: '',
        watchName: '',
        caseId: '',
        dialId: '',
        stonesId: '',
        braceletId: '',
        price: ''
      }
    }
  },
  methods: {
    async addWatch() {
      try {
        const response = await fetch('http://localhost:4000/add-watch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newWatch)
        })

        const data = await response.json()
        console.log(data)
        alert('Montre ajoutée avec succès!')
      } catch (error) {
        console.error('Error adding watch:', error)
        alert("Erreur lors de l'ajout de la montre.")
      }
    }
  }
}
</script>

<style scoped>
/* Styles CSS ici */
</style>
