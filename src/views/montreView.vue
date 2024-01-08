<template>
  <div>
    <h1>Montres par Utilisateur</h1>

    <div id="users-watches">
      <div v-for="(watches, username) in watchesByUser" :key="username" class="user-section">
        <h2>{{ username }}</h2>
        <ul class="watch-list">
          <li v-for="watch in watches" :key="watch" class="watch-item">{{ watch }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      watchesByUser: {}
    }
  },
  async created() {
    await this.getWatchesFromAPI()
  },
  methods: {
    async getWatchesFromAPI() {
      try {
        const response = await axios.get('http://localhost:4000/montres') // Remplacez l'URL par votre endpoint correct
        this.watchesByUser = response.data.watchesByUser || {}
      } catch (error) {
        console.error('Erreur lors de la récupération des montres:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Vos styles CSS ici */
.user-section {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.watch-list {
  list-style: none;
  padding: 0;
}

.watch-item {
  margin-bottom: 5px;
}
</style>
