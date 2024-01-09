<script setup>
import MyButton from '@/components/elements/MyButton.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import MyCardFood from '@/components/elements/MyCardFood.vue'
import { computed, onMounted, ref } from 'vue'
import { client } from '../utils/axios'
</script>
<template>
  <DefaultLayout>
    <template #header> </template>
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

    <template #footer>
      <MyButton href="/connexion" variant="rounded">Connexion</MyButton>
      <MyButton href="/montres" variant="rounded">Check montre</MyButton>
      <MyButton href="/add-watch" variant="rounded">Ajouter montre</MyButton>
    </template>
  </DefaultLayout>
  <!-- <MyButton size="small" href="/about">My Small Button</MyButton>
  <MyButton href="/about">My link Button</MyButton>
  <MyButton variant="rounded" >My rounded Button</MyButton> -->
  <p></p>
</template>
