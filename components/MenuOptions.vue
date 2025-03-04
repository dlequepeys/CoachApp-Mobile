<template>
  <div class="menu-options" v-if="showOptions">
    <button class="menu-item">Mon compte</button>
    <button class="menu-item">Paramètres</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showOptions = ref(false) // This should be passed as a prop
</script>

<style scoped>
/* Add menu options-specific styles here */
</style>