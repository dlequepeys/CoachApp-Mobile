<template>
  <div v-else-if="currentView === 'diag'" class="diag-view">
    <!-- Progress Info -->
    <div v-if="currentDiagTab === 'progress'" class="subtab-container">
      <section class="sub-tab">
        <h2 class="section-title">📈 Avancement</h2>
        <div v-if="currentDiagTab === 'progress'" class="project-phases">
          <div v-for="(phase, index) in projectPhases" :key="phase.name" class="phase-item">
            <span class="phase-name" :class="{ active: index === 1 }">{{ phase.name }}</span>
          </div>
        </div>
        <p class="progress-percentage">{{ progressPercentage }}%</p>
        <p>
          Tu es à {{ progressPercentage }}% de la phase {{ currentPhase }}.
        </p>
        <p>
          L'objectif de cette phase est de comprendre suffisamment le marché et les clients pour commencer la phase suivante de conception
        </p>
        <h3 class="section-title mt-8">🎯 Par domaine</h3>
        <div class="domains-grid">
          <div class="domain-item">
            <div class="domain-header">
              <h4>Segmentation client</h4>
              <div class="domain-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 60%"></div>
                </div>
                <span class="progress-text">60%</span>
              </div>
            </div>
          </div>
          <!-- Add other domain items here -->
        </div>
      </section>
    </div>
    <!-- Add other diagnostic tabs here -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref('diag') // This should be passed as a prop
const currentDiagTab = ref('progress') // This should be passed as a prop
const progressPercentage = 30 // This should be passed as a prop
const currentPhase = 'Recherche' // This should be passed as a prop
const projectPhases = [
  { name: 'Vision' },
  { name: 'Recherche' },
  { name: 'Conception' },
  { name: 'Test' },
  { name: 'Lancement' }
]
</script>

<style scoped>
/* Add diagnostic view-specific styles here */
</style>