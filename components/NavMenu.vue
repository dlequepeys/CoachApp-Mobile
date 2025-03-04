<template>
  <nav class="nav-menu">
    <button class="nav-item" @click="toggleOptions">
      <svg class="nav-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
      </svg>
      <span>Plus</span>
    </button>
    <button class="nav-item" @click="currentView = 'diag'">
      <svg class="nav-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
      </svg>
      <span>Diagnostic</span>
    </button>
    <!-- Add other nav items here -->
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref('chat') // This should be passed as a prop
const showOptions = ref(false)

function toggleOptions() {
  showOptions.value = !showOptions.value
}
</script>

<style scoped>
/* Add nav menu-specific styles here */
</style>