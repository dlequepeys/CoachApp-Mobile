<template>
  <div class="app-container">
    <div class="app-wrapper">
      <Header :currentView="currentView" />urrentView" />
      <SecondaryNav :currentView="currentView" :currentDiagTab="currentDiagTab" />"currentView" :currentDiagTab="currentDiagTab" />
      <main class="app-main">
        <ChatView v-if="currentView === 'chat'" :messages="messages" />sages" />
        <DiagnosticView v-else-if="currentView === 'diag'" :currentDiagTab="currentDiagTab" :progressPercentage="progressPercentage" :currentPhase="currentPhase" />'diag'" :currentDiagTab="currentDiagTab" :progressPercentage="progressPercentage" :currentPhase="currentPhase" />
      </main>>
      <NavMenu :currentView="currentView" @toggleOptions="toggleOptions" />:currentView="currentView" @toggleOptions="toggleOptions" />
      <MenuOptions v-if="showOptions" />      <MenuOptions v-if="showOptions" />
      <Footer :currentView="currentView" :messageText="messageText" :currentQuickActions="currentQuickActions" />ext="messageText" :currentQuickActions="currentQuickActions" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import TurndownService from 'turndown'rndownService from 'turndown'
import mammoth from 'mammoth'moth'
import * as pdfjsLib from 'pdfjs-dist'Lib from 'pdfjs-dist'
import Header from './components/Header.vue'r from './components/Header.vue'
import SecondaryNav from './components/SecondaryNav.vue'import SecondaryNav from './components/SecondaryNav.vue'
import ChatView from './components/ChatView.vue'ts/ChatView.vue'
import DiagnosticView from './components/DiagnosticView.vue'/components/DiagnosticView.vue'
import NavMenu from './components/NavMenu.vue'ponents/NavMenu.vue'
import MenuOptions from './components/MenuOptions.vue'
import Footer from './components/Footer.vue's/Footer.vue'

const messageText = ref('')ext = ref('')
const messages = ref([])const messages = ref([])
const synthesis = ref('')
const isAnalyzing = ref(false)
const chatContainer = ref(null)
const parsedSynthesis = computed(() => {
  if (!synthesis.value) return null
  try {
    const jsonStr = synthesis.value.match(/\{[\s\S]*\}/)?.[0]alue.match(/\{[\s\S]*\}/)?.[0]
    if (!jsonStr) return null
    return JSON.parse(jsonStr)jsonStr)
  } catch (err) {
    console.error('JSON parse error:', err)rror:', err)
    return null
  }
})
const fileInput = ref(null)= ref(null)
const showOptions = ref(false)ons = ref(false)
const currentView = ref('chat') // Default to chat viewconst currentView = ref('chat') // Default to chat view
const currentDiagTab = ref('progress')ress')

const turndownService = new TurndownService()const turndownService = new TurndownService()

// Constants
const progressPercentage = 30
const currentPhase = 'Recherche'

// Diagnostic tabs
const diagTabs = [
  { id: 'progress', name: 'Avancement' },
  { id: 'synthesis', name: 'Synthèse' },', name: 'Synthèse' },
  { id: 'strengths', name: 'Forces & Risques' },hs', name: 'Forces & Risques' },
  { id: 'method', name: 'Méthode' },  { id: 'method', name: 'Méthode' },
  { id: 'graph', name: 'Graphe' }
]

// Project phases datas data
const projectPhases = [ses = [
  { name: 'Vision' },
  { name: 'Recherche' },rche' },
  { name: 'Conception' },  { name: 'Conception' },
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

// Project evaluation quick actionsick actions
const projectQuickActions = [Actions = [
  'Télécharger une présentation',
  'Pose moi des questions plus précises'
]

// diag quick actions
const diagQuickActions = [
  'Segmenter les clients',
  'Affiner le besoin',
  'Je ne suis pas d\'accord'
]

// Computed property for current quick actionsons
const currentQuickActions = computed(() => {
  if (currentView.value === 'diag') {
    return diagQuickActions
  }
  
  const lastBotMessage = [...messages.value].reverse().find(m => m.type === 'bot' && !m.loading)essages.value].reverse().find(m => m.type === 'bot' && !m.loading)
  if (lastBotMessage?.text === 'Pour que j\'évalue ton projet, présente-le moi (tu peux uploader une présentation)') { présente-le moi (tu peux uploader une présentation)') {
    return projectQuickActionsns
  }
  return defaultQuickActions
})

async function sendMessage(text) {
  try {
    addMessage({
      type: 'user',
      text
    })

    addMessage({
      type: 'bot',      type: 'bot',
      text: '',
      loading: truerue
    })    })

    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        messages: [
          {
            role: 'system',
            content: 'You are CoachApp, an AI assistant helping entrepreneurs validate and develop their business ideas. Be concise, practical and encouraging.'t: 'You are CoachApp, an AI assistant helping entrepreneurs validate and develop their business ideas. Be concise, practical and encouraging.'
          },
          {
            role: 'user',',
            content: textext
          }
        ]
      }
    })

    messages.value[messages.value.length - 1] = {
      type: 'bot',
      text: response.message.content,
      loading: false
    }
  } catch (error) {
    console.error('Error sending message:', error)rror sending message:', error)
    messages.value[messages.value.length - 1] = {ength - 1] = {
      type: 'bot',
      text: 'Désolé, une erreur est survenue. Veuillez réessayer.',
      loading: false
    }
  }
}

async function analyzeSynthesis() {hesis() {
  if (!synthesis.value || isAnalyzing.value) return  if (!synthesis.value || isAnalyzing.value) return
  
  isAnalyzing.value = true
  const originalSynthesis = synthesis.value
  
  try {
    await sendMessage(`Here is the user's business idea idea
''
${originalSynthesis}
''
provide your answer following this json example for coachapp : coachapp : 
''
{
"business_model": {
"name": "CoachApp",
"description": "Assistant IA pour entrepreneurs",
"actors": [
{ "role": "Utilisateur", "contribution": "Utilisation de l'outil" },bution": "Utilisation de l'outil" },
{ "role": "Incubateur", "contribution": "Mise en relation avec startups" },ibution": "Mise en relation avec startups" },
{ "role": "Coach", "contribution": "Accompagnement des entrepreneurs" }tion": "Accompagnement des entrepreneurs" }
],
"value_flows": {"value_flows": {
"Utilisateur": {
"items": [
{ "from": "CoachApp", "to": "Utilisateur", "value": "Guidance IA et outils business" }ls business" }
],
"phase-completion": 70,
"risk-level": 2,
"underlying-assumptions": "Les entrepreneurs sont autonomes mais ont besoin d'un cadre structurant.",structurant.",
"supporting-evidence": "Retours utilisateurs et taux d'engagement sur les modules IA.",rs utilisateurs et taux d'engagement sur les modules IA.",
"strength": "Automatisation et adaptabilité de l'IA.",,
"warning": "Manque d'accompagnement humain pour les cas complexes."
},
"Incubateur": {
"items": [
{ "from": "CoachApp", "to": "Incubateur", "value": "Suivi des startups accompagnées" }: "Incubateur", "value": "Suivi des startups accompagnées" }
],
"phase-completion": 50,
"risk-level": 3,
"underlying-assumptions": "Les incubateurs veulent optimiser le suivi sans effort supplémentaire.",ubateurs veulent optimiser le suivi sans effort supplémentaire.",
"supporting-evidence": "Tests avec incubateurs partenaires.", "Tests avec incubateurs partenaires.",
"strength": "Gain de temps sur le reporting et centralisation des données.", temps sur le reporting et centralisation des données.",
"warning": "Nécessité d'intégration avec leurs outils existants." existants."
},
"Coach": {
"items": [
{ "from": "CoachApp", "to": "Coach", "value": "Visibilité et clients potentiels" }té et clients potentiels" }
],
"phase-completion": 60,
"risk-level": 2,
"underlying-assumptions": "Les coachs cherchent activement des clients qualifiés.", "Les coachs cherchent activement des clients qualifiés.",
"supporting-evidence": "Feedback de coachs sur les mises en relation.",": "Feedback de coachs sur les mises en relation.",
"strength": "Accès direct à des entrepreneurs en recherche d'accompagnement.",ect à des entrepreneurs en recherche d'accompagnement.",
"warning": "Qualité des mises en relation à affiner.""warning": "Qualité des mises en relation à affiner."
}
},
"problem": {
"Utilisateur": {
"items": ["Difficulté à structurer un projet", "Manque de guidance pour valider un business model"],", "Manque de guidance pour valider un business model"],
"phase-completion": 80,
"risk-level": 1,
"underlying-assumptions": "Les entrepreneurs veulent un cadre clair pour avancer.",s": "Les entrepreneurs veulent un cadre clair pour avancer.",
"supporting-evidence": "Interviews utilisateurs et tests UX.",ence": "Interviews utilisateurs et tests UX.",
"strength": "Clarté du parcours utilisateur.","strength": "Clarté du parcours utilisateur.",
"warning": "Besoin de personnalisation avancée."ancée."
},
"Incubateur": {
"items": ["Manque d'outils pour suivre les startups", "Données fragmentées"],ragmentées"],
"phase-completion": 40,
"risk-level": 4,
"underlying-assumptions": "Les incubateurs manquent d'outils unifiés.",bateurs manquent d'outils unifiés.",
"supporting-evidence": "Retours d'incubateurs partenaires.", "Retours d'incubateurs partenaires.",
"strength": "Centralisation des informations.",s.",
"warning": "Intégration avec outils tiers complexe."s complexe."
},
"Coach": {
"items": ["Difficulté à trouver des entrepreneurs à accompagner"],à trouver des entrepreneurs à accompagner"],
"phase-completion": 60,
"risk-level": 2,
"underlying-assumptions": "Les coachs veulent une plateforme de mise en relation efficace.",s": "Les coachs veulent une plateforme de mise en relation efficace.",
"supporting-evidence": "Analyse des plateformes existantes.",tes.",
"strength": "Facilité de mise en relation.",
"warning": "Forte concurrence avec d'autres plateformes."teformes."
}
}
}
}


''
`)

    // Get the last bot message which contains the analysise which contains the analysis
    const analysisMessage = messages.value[messages.value.length - 1]
    if (analysisMessage && analysisMessage.type === 'bot') {ssage.type === 'bot') {
      synthesis.value = analysisMessage.text
    }

  } finally {
    isAnalyzing.value = falsee = false
  }
}

function toggleOptions() {ns() {
  showOptions.value = !showOptions.value
}

function scrollToBottom() {m() {
  nextTick(() => { {
    if (chatContainer.value) {    if (chatContainer.value) {
      const container = chatContainer.valueontainer.value
      container.scrollTop = container.scrollHeight
    }
  })
}

function addMessage(message) {
  messages.value.push(message)essage)
  scrollToBottom()
}

async function addBotResponse(text) {n addBotResponse(text) {
  addMessage({  addMessage({
    type: 'bot',
    text: '',
    loading: true
  })

  await new Promise(resolve => setTimeout(resolve, 2000))ise(resolve => setTimeout(resolve, 2000))

  messages.value[messages.value.length - 1] = {messages.value.length - 1] = {
    type: 'bot',    type: 'bot',
    text,
    loading: false
  }
}

async function handleProjectEvaluation() {ndleProjectEvaluation() {
  await sendMessage('Pour que j\'évalue ton projet, présente-le moi (tu peux uploader une présentation)') sendMessage('Pour que j\'évalue ton projet, présente-le moi (tu peux uploader une présentation)') 
}

async function onQuickActionTap(action) {
  addMessage({
    type: 'user',
    text: action
  })  })
  
  if (action === 'Évalue mon projet') {
    await handleProjectEvaluation()
  } else if (action === 'Télécharger une présentation') {ion === 'Télécharger une présentation') {
    triggerFileInput()
  } else {
    await sendMessage(action)    await sendMessage(action)
  }
}

function onMicTap() {p() {
  console.log('Microphone tapped')ed')
}

function onSendTap() {
  if (messageText.value.trim()) {
    const text = messageText.value
    messageText.value = ''value = ''
    
    sendMessage(text)ext)
  }
}}

function triggerFileInput() {
  fileInput.value.click()
}

async function onFileSelected(event) {async function onFileSelected(event) {
  const file = event.target.files[0]iles[0]
  if (file) {
    const extractedText = await extractText(file) extractText(file)
    
    if (extractedText) {ext) {
      synthesis.value = extractedText
    }
    
    addMessage({
      type: 'user',
      text: `Document joint : ${file.name}
    })
        
    if (extractedText) {
      await addBotResponse('Voici le contenu extrait de ton document:\n\n' + extractedText)t:\n\n' + extractedText)
    } else {
      await addBotResponse('Je n\'ai pas pu extraire le contenu de ce type de document.')'Je n\'ai pas pu extraire le contenu de ce type de document.')
    }
    
    currentView.value = 'diag'
    event.target.value = ''rget.value = ''
  }
}

// Document text extraction functionsxtraction functions
function readFileAsText(file) {Text(file) {
  return new Promise((resolve, reject) => {ise((resolve, reject) => {
    const reader = new FileReader()()
    reader.onload = () => resolve(reader.result)=> resolve(reader.result)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader() new FileReader()
    reader.onload = () => resolve(reader.result) () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

async function extractText(file) { extractText(file) {
  const extension = file.name.split('.').pop().toLowerCase()on = file.name.split('.').pop().toLowerCase()
  
  try {
    let extractedText = ''ractedText = ''
        
    if (extension === 'txt' || extension === 'md') {ion === 'txt' || extension === 'md') {
      extractedText = await readFileAsText(file)le)
    }
    else if (extension === 'docx') {ocx') {
      const arrayBuffer = await readFileAsArrayBuffer(file)leAsArrayBuffer(file)
      const result = await mammoth.extractRawText({ arrayBuffer })      const result = await mammoth.extractRawText({ arrayBuffer })
      extractedText = result.valuet.value
    }
    else if (extension === 'pdf') {= 'pdf') {
      const arrayBuffer = await readFileAsArrayBuffer(file)t readFileAsArrayBuffer(file)
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promiseb.getDocument(arrayBuffer).promise
      const textContent = []
      
      for (let i = 1; i <= pdf.numPages; i++) {or (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent() page.getTextContent()
        const text = content.items.map(item => item.str).join(' ')tems.map(item => item.str).join(' ')
        textContent.push(text)nt.push(text)
      }
      
      extractedText = textContent.join('\n\n')   extractedText = textContent.join('\n\n')
    }  }
    else if (extension === 'html') {'html') {
      const text = await readFileAsText(file)ileAsText(file)
      extractedText = turndownService.turndown(text)
    }
        
    console.log('Extracted text:', extractedText)ext)
    return extractedText    return extractedText
  } catch (error) {rror) {
    console.error('Error extracting text:', error)acting text:', error)
    return null
  }  }
}

</script>

<style>
/* All styles from assets/styles/main.css */n.css */
@import './assets/styles/main.css';

.warning-message {
  color: #ff6b6b;
  font-size: 0.875rem;
}

/* Domain sections styles */ */
.domains-grid {
  display: grid;
  gap: 1rem; gap: 1rem;
  margin-top: 1rem;  margin-top: 1rem;
}

.domain-item {
  background: var(--color-background);round);
  border-radius: 12px;
  padding: 1rem;
}

.domain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem; gap: 1rem;
}}

.domain-header h4 {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 500;
  margin: 0; margin: 0;
}}

.domain-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;ap: 0.5rem;
  min-width: 120px;min-width: 120px;
}

.domain-progress .progress-bar { 
  flex: 1;
  height: 8px;
  background: var(--color-background-alt);background: var(--color-background-alt);
  border-radius: 4px;  border-radius: 4px;
  overflow: hidden;
}

.domain-progress .progress-fill {
  height: 100%;100%;
  background: var(--color-primary);ground: var(--color-primary);
  transition: width 0.3s ease-in-out;  transition: width 0.3s ease-in-out;
}

.domain-progress .progress-text {
  font-size: 0.875rem;em;
  color: var(--color-text-light);r: var(--color-text-light);
  min-width: 3em;  min-width: 3em;
  text-align: right;
}

.mt-8 {
  margin-top: 2rem;p: 2rem;
}

.action-button:disabled {on:disabled {
  opacity: 0.5;0.5;
  cursor: not-allowed;
  background-color: var(--color-background);-color-background);
}

/* Synthesis Styles */hesis Styles */
.synthesis-content {esis-content {
  margin: 1rem 0;  margin: 1rem 0;
}

.synthesis-section {
  margin-bottom: 2rem;m;
}

.synthesis-subtitle {
  font-size: 1.2rem;
  font-weight: 500;;
  color: var(--color-primary);
  margin-bottom: 0.5rem;rem;
}

.synthesis-description {synthesis-description {
  font-size: 0.9rem;  font-size: 0.9rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.4;line-height: 1.4;
}

.synthesis-label {ynthesis-label {
  font-size: 1rem;size: 1rem;
  font-weight: 500;
  color: var(--color-text);color: var(--color-text);
  margin-bottom: 0.5rem;rem;
}

.synthesis-list {ynthesis-list {
  list-style: none; list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.synthesis-list li {
  padding: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--color-text);color: var(--color-text);
}

.value-flow {w {
  background: var(--color-background);
  border-radius: 8px;border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem; 1rem;
}

.actor-name {
  font-weight: 500;
  color: var(--color-primary);color: var(--color-primary);
  margin-bottom: 0.5rem;: 0.5rem;
}

.flow-details {low-details {
  padding-left: 1rem;
}

.flow-item {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.flow-metrics {ics {
  display: flex;
  gap: 1rem;gap: 1rem;
  margin: 0.5rem 0;
  font-size: 0.8rem;rem;
}

.completion {
  color: var(--color-primary);
}

.risk {
  color: var(--color-text-light);olor-text-light);
}

.flow-analysis {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.strength {trength {
  color: var(--color-primary);color-primary);
  margin-bottom: 0.25rem;
}

.warning {
  color: #ff6b6b;
}

.problem-section {
  background: var(--color-background);nd: var(--color-background);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem; 1rem;
}

.problem-metrics {
  display: flex;
  gap: 1rem; gap: 1rem;
  margin-top: 0.5rem; margin-top: 0.5rem;
  font-size: 0.8rem; font-size: 0.8rem;
}
</style>