<template>
  <Header />
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
  <form @submit.prevent="updateMontreConfig" class="column-form">
    <label>Nom de la montre</label>
    <input v-model="updatedConfig.watch_name" type="text" placeholder="watch_name" />
    <h2>Boitier</h2>
    <div class="custom-radios">
      <div>
        <input
          type="radio"
          id="case-color-1"
          name="case-color"
          value="1"
          checked
          v-model="updatedConfig.case_id"
        />
        <label for="case-color-1">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="case-color-2"
          name="case-color"
          value="2"
          v-model="updatedConfig.case_id"
        />
        <label for="case-color-2">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="case-color-3"
          name="case-color"
          value="3"
          v-model="updatedConfig.case_id"
        />
        <label for="case-color-3">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
    </div>
    <h2>Cadran</h2>
    <div class="custom-radios">
      <div>
        <input
          type="radio"
          id="dial-color-1"
          name="dial-color"
          value="1"
          checked
          v-model="updatedConfig.dial_id"
        />
        <label for="dial-color-1">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="dial-color-2"
          name="dial-color"
          value="2"
          v-model="updatedConfig.dial_id"
        />
        <label for="dial-color-2">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="dial-color-3"
          name="dial-color"
          value="3"
          v-model="updatedConfig.dial_id"
        />
        <label for="dial-color-3">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="dial-color-4"
          name="dial-color"
          value="4"
          v-model="updatedConfig.dial_id"
        />
        <label for="dial-color-4">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
    </div>
    <h2>Pierres précieuses</h2>
    <div class="custom-radios">
      <div>
        <input
          type="radio"
          id="stone-color-1"
          name="stone-color"
          value="1"
          checked
          v-model="updatedConfig.stones_id"
        />
        <label for="stone-color-1">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="stone-color-2"
          name="stone-color"
          value="2"
          v-model="updatedConfig.stones_id"
        />
        <label for="stone-color-2">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="stone-color-3"
          name="stone-color"
          value="3"
          v-model="updatedConfig.stones_id"
        />
        <label for="stone-color-3">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="stone-color-4"
          name="stone-color"
          value="4"
          v-model="updatedConfig.stones_id"
        />
        <label for="stone-color-4">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="stone-color-5"
          name="stone-color"
          value="5"
          v-model="updatedConfig.stones_id"
        />
        <label for="stone-color-5">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
    </div>
    <h2>Bracelets</h2>
    <div class="custom-radios">
      <div>
        <input
          type="radio"
          id="bracelet-color-1"
          name="bracelet-color"
          value="1"
          checked
          v-model="updatedConfig.bracelet_id"
        />
        <label for="bracelet-color-1">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="bracelet-color-2"
          name="bracelet-color"
          value="2"
          v-model="updatedConfig.bracelet_id"
        />
        <label for="bracelet-color-2">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="bracelet-color-3"
          name="bracelet-color"
          value="3"
          v-model="updatedConfig.bracelet_id"
        />
        <label for="bracelet-color-3">
          <span>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
              alt="Checked Icon"
            />
          </span>
        </label>
      </div>
    </div>
    <button type="submit" class="submit-btn">Enregistrer</button>
    <button @click="deleteMontre" class="submit-btn">Supprimer cette montre</button>
  </form>
  <Footer />
</template>
<script setup>
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
</script>

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

<style lang="scss" scoped>
$color-1: #2ecc71;
$color-2: #3498db;
$color-3: #f1c40f;
$color-4: #00721f;
$color-5: #e74c3c;

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222;
}

.custom-radios {
  div {
    display: inline-block;
  }

  input[type='radio'] {
    display: none;

    + label {
      color: #333;
      font-family: Arial, sans-serif;
      font-size: 14px;

      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin: -1px 4px 0 0;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
        background-repeat: no-repeat;
        background-position: center;
        text-align: center;
        line-height: 44px;

        img {
          opacity: 0;
          transition: all 0.3s ease;
        }
      }
    }

    &#case-color-1 + label span,
    &#dial-color-1 + label span,
    &#stone-color-1 + label span,
    &#bracelet-color-1 + label span {
      background-color: $color-1;
    }

    &#case-color-2 + label span,
    &#dial-color-2 + label span,
    &#stone-color-2 + label span,
    &#bracelet-color-2 + label span {
      background-color: $color-2;
    }

    &#case-color-3 + label span,
    &#dial-color-3 + label span,
    &#stone-color-3 + label span,
    &#bracelet-color-3 + label span {
      background-color: $color-3;
    }

    &#case-color-4 + label span,
    &#dial-color-4 + label span,
    &#stone-color-4 + label span,
    &#bracelet-color-4 + label span {
      background-color: $color-4;
    }
    &#case-color-5 + label span,
    &#dial-color-5 + label span,
    &#stone-color-5 + label span,
    &#bracelet-color-5 + label span {
      background-color: $color-5;
    }

    &:checked + label span img {
      opacity: 1;
    }
  }
}

.submit-btn {
  display: inline-block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  border-radius: 0.25rem;
  max-width: 400px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  line-height: 1.375;
  font-family: $primary-font-family;

  border: #000000;
  color: #ffffff;
  text-transform: uppercase;
  background-color: #000000;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
