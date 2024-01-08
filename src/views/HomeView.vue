<script setup>
import MyButton from '@/components/elements/MyButton.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import MyCardFood from '@/components/elements/MyCardFood.vue'
import { computed, onMounted, ref } from 'vue'
import { client } from '../utils/axios'
// Modifier les deux fonctions pour executer 2 requêtes dans chacune, l'une après l'autre.
// Récupérer toutes les recettes
// Récupérer toutes les recettes de la cuisine 1 -> /recipes/cuisine/:cuisineId

const getRecipesThen = () => {
  // 1er appel
  fetch(import.meta.env.VITE_API_URL + '/recipes')
    .then((response) => response.json())
    .then((recipes) => {
      // Puis le 2ème lorsque le 1er est terminé
      fetch(import.meta.env.VITE_API_URL + '/recipes/cuisine/1')
        .then((response) => response.json())
        .then((cuisineRecipies) => console.log({ recipes, cuisineRecipies }))
    })
}

const recipes = ref([])

const getRecipes = async () => {
  const response = await client.get('/recipes')
  return response.data
}
// Retourner un tableau des noms des recettes en utilisant recipes.map
// ["Spaghetti Bolognese", "Vegan Stir-Fry", "Updated Spaghetti name", "Riz cantonais", ...]
// Retourner un tableau des recettes dont le titre contient « Spaghetti » en utilisant recipes.filter
// ["Spaghetti Bolognese", "Updated Spaghetti name"]
// Retourner un boolean qui dit si une de vos recettes est du goal_id 1 en utilisant recipes.some
// true
// const recipesNames = computed(() => {
//   return recipes.value.map((item) => item.recipe_name)
// })
// const spaghettiRecipes = computed(() => {
//   return recipes.value.filter((item) => item.recipe_name.toLowerCase().includes('spaghetti'))
// })
// const hasGoalId1Long = computed(() => {
//   return recipes.value.some((item) => {
//     if (item.goal_id === 1) {
//       return true
//     } else {
//       return false
//     }
//   })
// })
// const hasGoalId1 = computed(() => {
//   return recipes.value.some((item) => item.goal_id === 1)
// })
// const addRecipe = () => {
//   recipes.value.push({ recipe_name: 'Pesto spaghetti' })
// }

// Utiliser 2 computed pour gérer les listes de recette
// Une computed pour afficher les 4 premières du tableau recipes avec recipes.value.slice
const heroRecipes = computed(() => {
  return recipes.value.slice(0, 4)
})

// Une computed pour afficher toutes les autres avec recipes.value.slice
const otherRecipes = computed(() => {
  return recipes.value.slice(4)
})

const jpgRecipes = computed(() => {
  return recipes.value.filter((recipes) => recipes.image_url.includes('.jpg'))
})

const gridPage = ref(1)

const gridRecipes = computed(() => {
  const recipesByPage = 3
  // pour gridPage === 1 )> slice(4,7)

  // pour gridPage === 2 )> slice(4,10)

  // pour gridPage === 3 )> slice(4,13)

  return recipes.value.slice(4 /*...*/)
})

const seeMoreRecipes = () => {
  gridPage.value++
}

onMounted(async () => {
  recipes.value = await getRecipes()
})

const recipesInHero = 4
// Retourner s'il rest edes recettes à afficher ou non
const moreRecipesToShow = computed(() => {
  return gridRecipes.value.length < recipes.value.length - recipesInHero
})

// const recipes = ref([
//   {
//     name: 'Homer',
//     imageAlt: 'turlututu',
//     imageSrc: 'tutatatat',
//     title: 'choux à la crème',
//     description: "c'est un plat de choux",
//     price: 10
//   }
// ])
</script>
<template>
  <DefaultLayout>
    <template #header>
      <nav>
        <ul>
          <li v-for="recipe in recipes">
            <MyCardFood
              :id="recipe.recipe_id"
              :imageSrc="recipe.image_url"
              :title="recipe.recipe_name"
              :description="recipe.recipe_description"
            />
          </li>
        </ul>
      </nav>
    </template>
    <template #aside>
      <img style="max-width: 100px" src="@/assets/image-1.png" />
      <nav>
        <ul>
          <li><a href="#">Aside link 1</a></li>
          <li><a href="#">Aside link 2</a></li>
          <li><a href="#">Aside link 3</a></li>
        </ul>
      </nav>
    </template>
    {{ recipes }}
    {{ recipesNames }}
    recipes names : {{ recipesNames }} <br /><br />
    spaghettiRecipes : {{ spaghettiRecipes }} <br /><br />
    hasGoalId1 : {{ hasGoalId1 }} <br /><br />
    <button @click="addRecipe">Ajouter une recette</button>
    <template #footer>
      <MyButton href="/test" variant="rounded">Connexion</MyButton>
      <MyButton href="/montres" variant="rounded">Ajouter montre</MyButton>
    </template>
  </DefaultLayout>
  <!-- <MyButton size="small" href="/about">My Small Button</MyButton>
  <MyButton href="/about">My link Button</MyButton>
  <MyButton variant="rounded" >My rounded Button</MyButton> -->
  <p></p>
</template>
