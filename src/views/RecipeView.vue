<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { client, foo } from '../utils/axios'

const route = useRoute()

const recipe = ref({})

const getRecipe = async () => {
  const response = await client.get(`/recipes/${route.params.id}`)
  return response.data
}

onMounted(async () => {
  //   Requête pour récupérer la recette avec l'id correspondant
  recipe.value = await getRecipe()
})
</script>

<template>
  <div class="p-recipe-view">
    <p>{{ recipe.recipe_name }}</p>
    <RouterLink to="/">Retour à l'accueil</RouterLink>
    <p>recette avec l'id: {{ route.params.id }}</p>
    <p>Listes des ingrédients</p>
    <ul>
      <li v-for="ingredient in recipe.ingredients">
        {{ ingredient.ingredient_name }} {{ ingredient.quantity }} {{ ingredient.unit }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
