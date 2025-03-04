<template>
  <nav v-if="currentView === 'diag'" class="secondary-nav">
    <button 
      v-for="tab in diagTabs" 
      :key="tab.id"
      :class="['secondary-nav-item', { active: currentDiagTab === tab.id }]"
      @click="currentDiagTab = tab.id"
    >
      {{ tab.name }}
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref('diag') // This should be passed as a prop
const currentDiagTab = ref('progress') // This should be passed as a prop
const diagTabs = [
  { id: 'progress', name: 'Avancement' },
  { id: 'synthesis', name: 'Synthèse' },
  { id: 'strengths', name: 'Forces & Risques' },
  { id: 'method', name: 'Méthode' },
  { id: 'graph', name: 'Graphe' }
]
</script>

<style scoped>
/* Add secondary navigation-specific styles here */
</style>