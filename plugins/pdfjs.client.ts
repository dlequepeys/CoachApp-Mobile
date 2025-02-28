import { defineNuxtPlugin } from '#app'
import * as pdfjsLib from 'pdfjs-dist'

// Set worker source path to use unpkg CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`

export default defineNuxtPlugin(() => {
  // Plugin initialization
})