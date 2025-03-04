<template>
  <footer class="app-footer">
    <div class="quick-actions">
      <button 
        v-for="action in currentQuickActions" 
        :key="action"
        @click="onQuickActionTap(action)"
        class="secondary-button">
        {{ action }}
      </button>
    </div>
    <div class="input-container" v-if="currentView === 'chat'">
      <input 
        ref="fileInput"
        type="file"
        class="hidden"
        @change="onFileSelected"
      />
      <button @click="triggerFileInput" class="icon-button">
        <svg class="icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
        </svg>
      </button>
      <input 
        v-model="messageText"
        type="text"
        placeholder="Écris ou parle..."
        class="message-input"
        @keyup.enter="onSendTap"
      />
      <button @click="onMicTap" class="icon-button">
        <svg class="icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
        </svg>
      </button>
      <button @click="onSendTap" class="icon-button">
        <svg class="icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref('chat') // This should be passed as a prop
const messageText = ref('') // This should be passed as a prop
const currentQuickActions = ref([]) // This should be passed as a prop

function onQuickActionTap(action) {
  // Handle quick action tap
}

function onMicTap() {
  // Handle mic tap
}

function onSendTap() {
  // Handle send tap
}

function triggerFileInput() {
  // Trigger file input
}

function onFileSelected(event) {
  // Handle file selected
}
</script>

<style scoped>
/* Add footer-specific styles here */
</style>