<template>
  <div>
    <h1>Ajouter une montre</h1>
    <form @submit.prevent="addWatch">
      <label for="userId">ID Utilisateur:</label>
      <input v-model="newWatch.userId" type="text" id="userId" name="userId" /><br /><br />

      <label for="watchName">Nom de la montre:</label>
      <input v-model="newWatch.watchName" type="text" id="watchName" name="watchName" /><br /><br />

      <label for="caseId">ID du boîtier:</label>
      <input v-model="newWatch.caseId" type="text" id="caseId" name="caseId" /><br /><br />

      <label for="dialId">ID du cadran:</label>
      <input v-model="newWatch.dialId" type="text" id="dialId" name="dialId" /><br /><br />

      <label for="stonesId">ID des pierres:</label>
      <input v-model="newWatch.stonesId" type="text" id="stonesId" name="stonesId" /><br /><br />

      <label for="braceletId">ID du bracelet:</label>
      <input
        v-model="newWatch.braceletId"
        type="text"
        id="braceletId"
        name="braceletId"
      /><br /><br />

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
