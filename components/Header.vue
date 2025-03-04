<template>
  <header class="app-header">
    <h1 class="app-title">{{ currentView === 'diag' ? 'Diagnostic' : 'CoachApp' }}</h1>
    <p class="app-subtitle" v-if="currentView !== 'diag'">
      Ton assistant IA de création d'entreprise
    </p>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref('chat') // This should be passed as a prop
</script>

<style scoped>
/* Add header-specific styles here */
</style>