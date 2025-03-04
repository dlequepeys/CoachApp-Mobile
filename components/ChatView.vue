<template>
  <div v-if="currentView === 'chat'" class="chat-view">
    <p class="help-text">
      En quoi puis-je t'aider ?
    </p>
    <div ref="chatContainer" class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="message.type === 'user' ? 'user-message' : 'bot-message'">
        <template v-if="message.type === 'bot' && message.loading">
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </template>
        <template v-else>
          {{ message.text }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentView = ref('chat') // This should be passed as a prop
const messages = ref([]) // This should be passed as a prop
const chatContainer = ref(null)
</script>

<style scoped>
/* Add chat view-specific styles here */
</style>