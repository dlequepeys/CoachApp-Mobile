<template>
  <div class="app-container">
    <div class="app-wrapper">
      <!-- Header Section -->
      <header class="app-header">
        <h1 class="app-title">{{ currentView === 'diag' ? 'Diagnostic' : 'CoachApp' }}</h1> <!-- TODO: Change title based on current view -->
        <p class="app-subtitle" v-if="currentView !== 'diag'">
          Ton assistant IA de création d'entreprise <!--TODO: créer des sous titres pour toutes les sections-->
        </p>
      </header>

      <!-- Secondary Navigation for Diagnostic -->
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

      <!-- Main Content Area -->
      <main class="app-main">
        <!-- Chat View -->
        <div v-if="currentView === 'chat'" class="chat-view">
          <p class="help-text">
            En quoi puis-je t'aider ?
          </p>

          <!-- Chat Messages -->
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

        <!-- Diagnostic View -->
        <div v-if="currentView === 'diag'" class="diag-view">

          <!-- Progress Subtab -->
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
            <p >
              L'objectif de cette phase est de comprendre suffisamment le marché et les clients pour commencer la phase suivante de conception
            </p>

                  <h3 class="section-title mt-8"> Par domaine</h3>
                  <div class="domains-grid">
                    <div class="domain-item">
                      <div class="domain-header">
                        <h4>🎯 Segmentation client</h4>
                        <div class="domain-progress">
                          <span class="progress-text">60%</span>
                        </div>
                      </div>
                      <div class="domain-header">
                        <h4>💔 Compréhension besoin</h4>
                        <div class="domain-progress">
                          <span class="progress-text">30%</span>
                        </div>
                      </div>
                      <div class="domain-header">
                        <h4>🦈 Etude concurrence</h4>
                        <div class="domain-progress">
                          <span class="progress-text">20%</span>
                        </div>
                      </div>
                       <div class="domain-header">
                        <h4>💸 Faisabilité économique</h4>
                        <div class="domain-progress">
                          <span class="progress-text">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                

              </section>
          </div>

          <div v-if="currentDiagTab === 'synthesis'" class="subtab-container">
            <!-- Pitch Subtab -->
            <section class="sub-tab">
              <h2 class="section-title">🎤 Pitch</h2>
              <p class="pitch-text">
                Recupack est une plateforme permettant aux restaurants traiteurs et aux clients livrés de faciliter la récupération des emballages consignés grâce à la mutualisation entre restaurants et livreurs par QRcode
              </p>
              <button class="action-button">
                Voir la synthèse
              </button>
            </section>
            <section class="sub-tab">
              <h2 class="section-title">📝 Synthèse</h2>
              <div v-if="!synthesis" class="pitch-text">
                Aucun document analysé pour le moment.
              </div>
              <!-- Display of AI generated synthesis-->
              <div v-else class="synthesis-content">
                <template v-if="parsedSynthesis">
                  <!-- Business Model Section -->
                  <div class="synthesis-section">
                    <h3 class="synthesis-subtitle">🎯 {{ parsedSynthesis.business_model.name }}</h3>
                    <p class="synthesis-description">{{ parsedSynthesis.business_model.description }}</p>
                    
                    <!-- Actors -->
                    <div class="mt-4">
                      <h4 class="synthesis-label">Acteurs clés</h4>
                      <ul class="synthesis-list">
                        <li v-for="actor in parsedSynthesis.business_model.actors" :key="actor.role">
                          <strong>{{ actor.role }}:</strong> {{ actor.contribution }}
                        </li>
                      </ul>
                    </div>

                    <!-- Value Flows -->
                    <div class="mt-4">
                      <h4 class="synthesis-label">Flux de valeur</h4>
                      <div v-for="(flow, actor) in parsedSynthesis.business_model.value_flows" :key="actor" class="value-flow">
                        <h5 class="actor-name">{{ actor }}</h5>
                        <div class="flow-details">
                          <div v-for="item in flow.items" :key="item.value" class="flow-item">
                            {{ item.value }}
                          </div>
                          <div class="flow-metrics">
                            <span class="completion">Avancement: {{ flow['phase-completion'] }}%</span>
                            <span class="risk">Risque: {{ flow['risk-level'] }}/5</span>
                          </div>
                          <div class="flow-analysis">
                            <p v-if="flow.strength" class="strength">✅ {{ flow.strength }}</p>
                            <p v-if="flow.warning" class="warning">⚠️ {{ flow.warning }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Problems -->
                    <div class="mt-4">
                      <h4 class="synthesis-label">Problématiques</h4>
                      <div v-for="(problem, actor) in parsedSynthesis.business_model.problem" :key="actor" class="problem-section">
                        <h5 class="actor-name">{{ actor }}</h5>
                        <ul class="synthesis-list">
                          <li v-for="item in problem.items" :key="item">{{ item }}</li>
                        </ul>
                        <div class="problem-metrics">
                          <span class="completion">Validation: {{ problem['phase-completion'] }}%</span>
                          <span class="risk">Criticité: {{ problem['risk-level'] }}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div v-else class="pitch-text"> <!--TODO: revoir : dans quel cas s'afficherait ? afficherait la synthèse brute au cas d'échec du pasing de synthesis (synthesis existe mais pas parsedsyntehsis ?-->
                  {{ synthesis }}                 )

                </div>
              </div>
              <div class="flex justify-center gap-4">
                <button 
                  class="action-button" 
                  @click="analyzeSynthesis"
                  :disabled="isAnalyzing || !synthesis"
                >
                  <span v-if="isAnalyzing">Analyse en cours...</span>
                  <span v-else>Relancer l'analyse</span>
                </button>
              </div>
            </section>

            <!-- Focus Section -->
            <section class="sub-tab">
              <h2 class="section-title">A clarifier</h2>
              <p>Modèle économique, prospects principaux, bénéfice pour les livreurs,... ?</p>
              <button class="action-button">
                Préciser
              </button>
            </section>
          </div>

          <!-- Strengths & Risks View -->
          <div v-if="currentDiagTab === 'strengths'" class="subtab-container">
            <section class="sub-tab">
              <h2 class="section-title">Forces & Risques</h2>
              <div class="two-col">
                <div class="strengths">
                  <h3>✅ Forces</h3>
                  <ul>
                    <li>Marché porteur</li>
                    <li>Besoin réel</li>
                    <li>Avantage concurrentiel</li>
                  </ul>
                </div>
                <div class="risks">
                  <h3>⚠️ Risques</h3>
                  <ul>
                    <li>Dépendance à un acteur clé</li>
                    <li>Difficulté d'acquisition</li>
                    <li>Problème d'échelle</li>
                  </ul>
                </div>
              </div>
              <button class="action-button">
                En savoir plus
              </button>
            </section>
          </div>

          <!-- Method View -->
          <div v-if="currentDiagTab === 'method'" class="subtab-container">
            <section class="sub-tab">
              <h2 class="section-title">Méthode</h2>
              <div class="two-col">
                <p>
                  👏 Bravo, tu as déjà formalisé une présentation, et réfléchis sur une solution possible.
                </p>
                <p>
                  ⚠️ Attention : Tu travailles trop sur la solution. Arrête-toi là et valide d'abord les besoins des clients.
                </p>
              </div>
              <button class="action-button">
                En savoir plus
              </button>
            </section>
          </div>

          <!-- Graph View -->
          <div v-if="currentDiagTab === 'graph'" class="subtab-container">
            <section class="sub-tab">
              <h2 class="section-title">Graphe</h2>
              <p>Visualisation du projet en cours de développement...</p>
              <button class="action-button">
                Voir le détail
              </button>
            </section>
          </div>
        </div>
        <div v-if="currentView === 'resources'" class="subtab-container">
          <section class="sub-tab">
            <h2 class="section-title">Ressources</h2>
            <p>Des ressources pour t'aider à avancer</p>
          </section>
        </div>
        <div v-if="currentView === 'community'" class="subtab-container">
          <section class="sub-tab">
            <h2 class="section-title">Communauté</h2>
            <div class="members-grid">
              <div v-for="member in communityMembers" :key="member.id" class="member-card">
                <div class="member-photo">
                  <img :src="member.photo" :alt="member.name">
                </div>
                <div class="member-info">
                  <h3>{{ member.name }}</h3>
                  <p class="member-role">{{ member.role }}</p>
                  <div class="member-tags">
                    <span v-for="tag in member.tags" 
                          :key="tag" 
                          :class="['member-tag', `tag-${tag}`]">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div v-if="currentView === 'actions'" class="subtab-container">
          <section class="sub-tab">
            <h2 class="section-title">🎯 Challenge de la semaine</h2>
            <div class="challenge-list">
              <div class="challenge-item">
                <div class="challenge-header">
                  <div class="challenge-number">1</div>
                  <div class="challenge-content">
                    <h3>Entretiens</h3>
                    <p>Conduire 4 entretiens découverte client</p>
                  </div>
                  <div class="challenge-progress">
                    <div class="progress-ring">
                      <div class="progress-fill" style="--progress: 70%"></div>
                    </div>
                    <div class="challenge-arrow">›</div>
                  </div>
                </div>
              </div>
              <div class="challenge-item">
                <div class="challenge-header">
                  <div class="challenge-number">2</div>
                  <div class="challenge-content">
                    <h3>Concurrence</h3>
                    <p>Finaliser l'analyse concurrentielle</p>
                  </div>
                  <div class="challenge-progress">
                    <div class="progress-ring">
                      <div class="progress-fill" style="--progress: 38%"></div>
                    </div>
                    <div class="challenge-arrow">›</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info-banner">
              <p>J'ai ajouté ceci en priorité n°2 de la semaine. Tu peux le réordonner.</p>
            </div>
          </section>
        </div>
      </main>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <button class="nav-item" @click="toggleOptions">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
          </svg><!--TODO: remplacer les svg par fontawesome SVG-->
          <span>Plus</span>
        </button>

        <button class="nav-item" @click="currentView = 'diag'">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
          </svg>
          <span>Diagnostic</span>
        </button>
        
        <button class="nav-item" @click="currentView = 'resources'">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,8A3,3 0 0,0 15,5A3,3 0 0,0 12,2A3,3 0 0,0 9,5A3,3 0 0,0 12,8M12,11.54C9.64,9.35 6.5,8 3,8V19C6.5,19 9.64,20.35 12,22.54C14.36,20.35 17.5,19 21,19V8C17.5,8 14.36,9.35 12,11.54Z" />
          </svg>
          <span>Ressources</span>
        </button>

        <button class="nav-item" @click="currentView = 'community'">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
          </svg>
          <span>Communauté</span>
        </button>

        <button class="nav-item" @click="currentView = 'actions'">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
          </svg>
          <span>Actions</span>
        </button>

        <button class="nav-item chat-button" @click="currentView = 'chat'">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18" />
          </svg>
          <span>Chat</span>
        </button>
      </nav>

      <!-- Menu Options -->
      <div class="menu-options" v-if="showOptions">
        <button class="menu-item">Mon compte</button>
        <button class="menu-item">Paramètres</button>
      </div>

      <!-- Bottom Section -->
      <footer class="app-footer">
        <!-- Quick-Action Buttons -->
        <div class="quick-actions">
          <button 
            v-for="action in currentQuickActions" 
            :key="action"
            @click="onQuickActionTap(action)"
            class="secondary-button">
            {{ action }}
          </button>
        </div>

        <!-- Input Field -->
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
            placeholder="Écris ..."
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import TurndownService from 'turndown'
import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'

const messageText = ref('')
const messages = ref([])
const synthesis = ref('')
const isAnalyzing = ref(false)
const chatContainer = ref(null)
const parsedSynthesis = computed(() => { //TODO: revoir  pourquoi besoin de parser
  if (!synthesis.value) return null
  try {
    const jsonStr = synthesis.value.match(/\{[\s\S]*\}/)?.[0]
    if (!jsonStr) return null
    return JSON.parse(jsonStr)
  } catch (err) {
    console.error('JSON parse error:', err)
    return null
  }
})
const fileInput = ref(null)
const showOptions = ref(false)
const currentView = ref('chat') // Default to chat view
const currentDiagTab = ref('progress')

// Community members data
const communityMembers = [
  { 
    id: 1,
    name: 'Sophie Martin',
    role: 'UX Designer',
    photo: 'https://i.pravatar.cc/150?img=44',
    tags: ['entrepreneur']
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    role: 'Business Coach',
    photo: 'https://i.pravatar.cc/150?img=12',
    tags: ['coach', 'expert']
  },
  {
    id: 3,
    name: 'Julie Dubois',
    role: 'Product Manager',
    photo: 'https://i.pravatar.cc/150?img=5',
    tags: ['entrepreneur', 'expert']
  },
  {
    id: 4,
    name: 'Marc Leroy',
    role: 'Growth Mentor',
    photo: 'https://i.pravatar.cc/150?img=7',
    tags: ['coach']
  },
  {
    id: 5,
    name: 'Emma Petit',
    role: 'Startup Founder',
    photo: 'https://i.pravatar.cc/150?img=49',
    tags: ['entrepreneur']
  },
  {
    id: 6,
    name: 'Lucas Moreau',
    role: 'Tech Lead',
    photo: 'https://i.pravatar.cc/150?img=69',
    tags: ['entrepreneur', 'expert']
  },
  {
    id: 7,
    name: 'Sarah Cohen',
    role: 'Marketing Expert',
    photo: 'https://i.pravatar.cc/150?img=32',
    tags: ['coach', 'expert']
  },
  {
    id: 8,
    name: 'Antoine Roux',
    role: 'Business Angel',
    photo: 'https://i.pravatar.cc/150?img=8',
    tags: ['expert']
  },
  {
    id: 9,
    name: 'Marie Lambert',
    role: 'Innovation Coach',
    photo: 'https://i.pravatar.cc/150?img=10',
    tags: ['coach']
  },
  {
    id: 10,
    name: 'Pierre Durand',
    role: 'Startup Founder',
    photo: 'https://i.pravatar.cc/150?img=64',
    tags: ['entrepreneur']
  }
]

const turndownService = new TurndownService()

// Constants
// TODO: internationalisation

const progressPercentage = 30
const currentPhase = 'Recherche'

// Diagnostic tabs
const diagTabs = [
  { id: 'progress', name: 'Avancement' },
  { id: 'synthesis', name: 'Synthèse' },
  { id: 'strengths', name: 'Forces & Risques' },
  { id: 'method', name: 'Méthode' },
  { id: 'graph', name: 'Graphe' }
]

// Project phases data
const projectPhases = [
  { name: 'Vision' },
  { name: 'Recherche' },
  { name: 'Conception' },
  { name: 'Test' },
  { name: 'Lancement' }
]

// Default quick actions
const defaultQuickActions = [
  'Évalue mon projet',
  'J\'ai une question précise',
  'Aide moi à avancer',
  'Dis m\'en plus sur CoachApp'
]

// Project evaluation quick actions
const projectQuickActions = [
  'Télécharger une présentation',
  'Pose moi des questions plus précises'
]

// diag quick actions
const diagQuickActions = [
  'Segmenter les clients',
  'Affiner le besoin',
  'Je ne suis pas d\'accord'
]

// Computed property for current quick actions
const currentQuickActions = computed(() => {
  if (currentView.value === 'diag') {
    return diagQuickActions
  }
  
  const lastBotMessage = [...messages.value].reverse().find(m => m.type === 'bot' && !m.loading) //TODO: revoir la génération des quickactions selon l'intention du dernier message du bot (ici aiguillage en dur)
  if (lastBotMessage?.text === 'Pour que j\'évalue ton projet, présente-le moi (tu peux uploader une présentation)') {
    return projectQuickActions
  }
  return defaultQuickActions
})

async function sendUserMessage(text) { 
  try {
    addMessage({
      type: 'user',
      text
    })

    addMessage({
      type: 'bot',
      text: '',
      loading: true
    })

    // Get all previous messages to maintain conversation history
    const messageHistory = messages.value
      .filter(m => !m.loading)
      .map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text
      }))

    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        messages: messageHistory.concat({
          role: 'user',
          content: text
        })
      }
    })

    messages.value[messages.value.length - 1] = {
      type: 'bot',
      text: response.message.content,
      loading: false
    }
  } catch (error) {
    console.error('Error sending message:', error)
    messages.value[messages.value.length - 1] = {
      type: 'bot',
      text: 'Désolé, une erreur est survenue. Veuillez réessayer.',
      loading: false
    }
  }
}

async function analyzeSynthesis() {
  if (!synthesis.value || isAnalyzing.value) return
  
  isAnalyzing.value = true
  const originalSynthesis = synthesis.value
  //TODO: revoir, l'envoi de la synthèse ne devrait pas être affichée comme un message de l'utilisateur mais envoyé à l'api
  
  try {
    await sendUserMessage(`Here is the user's business idea 
''
${originalSynthesis}
''
provide your answer following this json example for coachapp : 
''
{
"business_model": {
"name": "CoachApp",
"description": "Assistant IA pour entrepreneurs",
"actors": [
{ "role": "Utilisateur", "contribution": "Utilisation de l'outil" },
{ "role": "Incubateur", "contribution": "Mise en relation avec startups" },
{ "role": "Coach", "contribution": "Accompagnement des entrepreneurs" }
],
"value_flows": {
"Utilisateur": {
"items": [
{ "from": "CoachApp", "to": "Utilisateur", "value": "Guidance IA et outils business" }
],
"phase-completion": 70,
"risk-level": 2,
"underlying-assumptions": "Les entrepreneurs sont autonomes mais ont besoin d'un cadre structurant.",
"supporting-evidence": "Retours utilisateurs et taux d'engagement sur les modules IA.",
"strength": "Automatisation et adaptabilité de l'IA.",
"warning": "Manque d'accompagnement humain pour les cas complexes."
},
"Incubateur": {
"items": [
{ "from": "CoachApp", "to": "Incubateur", "value": "Suivi des startups accompagnées" }
],
"phase-completion": 50,
"risk-level": 3,
"underlying-assumptions": "Les incubateurs veulent optimiser le suivi sans effort supplémentaire.",
"supporting-evidence": "Tests avec incubateurs partenaires.",
"strength": "Gain de temps sur le reporting et centralisation des données.",
"warning": "Nécessité d'intégration avec leurs outils existants."
},
"Coach": {
"items": [
{ "from": "CoachApp", "to": "Coach", "value": "Visibilité et clients potentiels" }
],
"phase-completion": 60,
"risk-level": 2,
"underlying-assumptions": "Les coachs cherchent activement des clients qualifiés.",
"supporting-evidence": "Feedback de coachs sur les mises en relation.",
"strength": "Accès direct à des entrepreneurs en recherche d'accompagnement.",
"warning": "Qualité des mises en relation à affiner."
}
},
"problem": {
"Utilisateur": {
"items": ["Difficulté à structurer un projet", "Manque de guidance pour valider un business model"],
"phase-completion": 80,
"risk-level": 1,
"underlying-assumptions": "Les entrepreneurs veulent un cadre clair pour avancer.",
"supporting-evidence": "Interviews utilisateurs et tests UX.",
"strength": "Clarté du parcours utilisateur.",
"warning": "Besoin de personnalisation avancée."
},
"Incubateur": {
"items": ["Manque d'outils pour suivre les startups", "Données fragmentées"],
"phase-completion": 40,
"risk-level": 4,
"underlying-assumptions": "Les incubateurs manquent d'outils unifiés.",
"supporting-evidence": "Retours d'incubateurs partenaires.",
"strength": "Centralisation des informations.",
"warning": "Intégration avec outils tiers complexe."
},
"Coach": {
"items": ["Difficulté à trouver des entrepreneurs à accompagner"],
"phase-completion": 60,
"risk-level": 2,
"underlying-assumptions": "Les coachs veulent une plateforme de mise en relation efficace.",
"supporting-evidence": "Analyse des plateformes existantes.",
"strength": "Facilité de mise en relation.",
"warning": "Forte concurrence avec d'autres plateformes."
}
}
}
}


''
`)

    // Get the last bot message which contains the analysis
    const analysisMessage = messages.value[messages.value.length - 1] //TODO: pas besoin de mettre dans le message user
    if (analysisMessage && analysisMessage.type === 'bot') {
      synthesis.value = analysisMessage.text
    }

  } finally {
    isAnalyzing.value = false
  }
}

function toggleOptions() {
  showOptions.value = !showOptions.value
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      const container = chatContainer.value
      container.scrollTop = container.scrollHeight
    }
  })
}

function addMessage(message) {
  messages.value.push(message)
  scrollToBottom()
}

async function addBotResponse(text) {//TODO: peut-on réutiliser cette fonction dans l'appel de sendUserMessage ?
  addMessage({
    type: 'bot',
    text: '',
    loading: true
  })

  await new Promise(resolve => setTimeout(resolve, 2000))

  messages.value[messages.value.length - 1] = {
    type: 'bot',
    text,
    loading: false
  }
}

async function handleProjectEvaluation() {
  await sendUserMessage('Pour que j\'évalue ton projet, présente-le moi (tu peux uploader une présentation)') 
}

async function onQuickActionTap(action) {
 /* addMessage({
    type: 'user',
    text: action
  })
    */
  
  if (action === 'Évalue mon projet') { //TODO: mettre ici l'aiguillage en fonction des quick actions 
    await handleProjectEvaluation()
  } else if (action === 'Télécharger une présentation') {
    triggerFileInput()
  } else {
    await sendUserMessage(action)
  }
}

function onMicTap() {
  console.log('Microphone tapped')
}

function onSendTap() {
  if (messageText.value.trim()) {
    const text = messageText.value
    messageText.value = ''
    
    sendUserMessage(text)
  }
}

function triggerFileInput() {
  fileInput.value.click()
}

async function onFileSelected(event) {
  const file = event.target.files[0]
  if (file) {
    const extractedText = await extractText(file)
    
    if (extractedText) {
      synthesis.value = extractedText
    }
    
    addMessage({
      type: 'user',
      text: `Document joint : ${file.name}`
    })
    
    if (extractedText) {
      await addBotResponse('J\'ai extrait le contenu de ton document. Mon analyse est dans l\'onglet Diagnostic')
    } else {
      await addBotResponse('Je n\'ai pas pu extraire le contenu de ce type de document.')
    }
    
    currentView.value = 'diag'
    event.target.value = ''
  }
}

// Document text extraction functions
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

async function extractText(file) {
  const extension = file.name.split('.').pop().toLowerCase()
  
  try {
    let extractedText = ''
    
    if (extension === 'txt' || extension === 'md') {
      extractedText = await readFileAsText(file)
    }
    else if (extension === 'docx') {
      const arrayBuffer = await readFileAsArrayBuffer(file)
      const result = await mammoth.extractRawText({ arrayBuffer })
      extractedText = result.value
    }
    else if (extension === 'pdf') { //FIXME: parseur pdf ne marche pas
      const arrayBuffer = await readFileAsArrayBuffer(file)
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
      const textContent = []
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const text = content.items.map(item => item.str).join(' ')
        textContent.push(text)
      }
      
      extractedText = textContent.join('\n\n')
    }
    else if (extension === 'html') {
      const text = await readFileAsText(file)
      extractedText = turndownService.turndown(text)
    }
    
    console.log('Extracted text:', extractedText)
    return extractedText
  } catch (error) {
    console.error('Error extracting text:', error)
    return null
  }
}

</script>

<style>
/* All styles from assets/styles/main.css */
@import './assets/styles/main.css';

/* Challenge List Styles */
.challenge-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.challenge-item {
  background: var(--color-background);
  border-radius: 12px;
  padding: 0.5rem;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.challenge-item:hover {
  transform: translateX(4px);
}

.challenge-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.challenge-number {
  width: 2rem;
  height: 2rem;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.challenge-content {
  flex: 1;
}

.challenge-content h3 {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.challenge-content p {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.challenge-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-ring {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #eee;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(var(--color-primary) var(--progress), transparent 0);
  transition: all 0.2s ease-in-out;
}
.progress-ring::before {
  content: "";
  width: 60%;
  height: 60%;
  background: white;
  border-radius: 50%;
  position: absolute ;
  inset: 0;  /* Centre automatiquement l'élément */
  margin: auto; /* Assure que le cercle est bien centré */
  z-index:10
}
.challenge-arrow {
  font-size: 1.5rem;
  color: var(--color-text-light);
  font-weight: 300;
}

.info-banner {
  background: #fff9e6;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  color: #946500;
  font-size: 0.9rem;
}
.warning-message {
  color: #ff6b6b;
  font-size: 0.875rem;
}

/* Domain sections styles */ 
/* TODO: est-ce que ces styles sont pertinents et devraient êetre dans main ou autre css dédiée ?*/
.domains-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.domain-item {
  background: var(--color-background);
  border-radius: 12px;
  padding: 1rem;
}

.domain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.domain-header h4 {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.domain-progress {
  display: flex;
  align-items: center;
  min-width: 120px;
}

.domain-progress .progress-text {
  font-size: 0.875rem;
  color: var(--color-text-light);
  min-width: 3em;
  text-align: right;
  margin-left: auto;
}

.mt-8 {
  margin-top: 2rem;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--color-background);
}

/* Synthesis Styles */
.synthesis-content {
  margin: 1rem 0;
}

.synthesis-section {
  margin-bottom: 2rem;
}

.synthesis-subtitle {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.synthesis-description {
  font-size: 0.9rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.synthesis-label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.synthesis-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.synthesis-list li {
  padding: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--color-text);
}

.value-flow {
  background: var(--color-background);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.actor-name {
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.flow-details {
  padding-left: 1rem;
}

.flow-item {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.flow-metrics {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  font-size: 0.8rem;
}

.completion {
  color: var(--color-primary);
}

.risk {
  color: var(--color-text-light);
}

.flow-analysis {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.strength {
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.warning {
  color: #ff6b6b;
}

.problem-section {
  background: var(--color-background);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.problem-metrics {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

/* Community Members Grid */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
  width: 100%;
}

.member-card {
  background: var(--color-background);
  border-radius: 12px;
  padding: 1rem;
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center; 
  text-align: center;
  box-shadow: 0 2px 4px var(--color-shadow);
  transition: transform 0.2s ease;
  width: 100%;
}

.member-card:hover {
  transform: translateY(-2px);
}

.member-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info h3 {
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.member-role {
  color: var(--color-text-light);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.member-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.member-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag-entrepreneur {
  background-color: #e9f5ff;
  color: #0066cc;
}

.tag-coach {
  background-color: #fff2e9;
  color: #ff6b2c;
}

.tag-expert {
  background-color: #d9ead3;
  color: #6aa84f;
}
</style>