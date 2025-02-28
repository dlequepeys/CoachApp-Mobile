import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const start = Date.now()
  const requestBody = await readRequestBody(event).catch(() => null)
  
  console.log(`[API] ${new Date().toISOString()} Request:`, {
    method: event.node.req.method,
    url: event.node.req.url,
    body: requestBody,
    headers: event.node.req.headers
  })

  try {
    // Let the request continue to be handled by other handlers
    const duration = Date.now() - start
    console.log(`[API] ${new Date().toISOString()} Response:`, {
      duration: `${duration}ms`,
      url: event.node.req.url
    })
  } catch (error) {
    const duration = Date.now() - start
    console.error(`[API] ${new Date().toISOString()} Error:`, {
      url: event.node.req.url,
      duration: `${duration}ms`, 
      error: error.message,
      stack: error.stack
    })
    throw error
  }
})

async function readRequestBody(event) {
  if (event.node.req.method === 'GET') return null
  
  try {
    const body = await readBody(event)
    // Mask sensitive data like API keys
    if (body?.messages) {
      return {
        ...body,
        messages: body.messages.map(msg => ({
          ...msg,
          content: msg.role === 'system' ? '[SYSTEM PROMPT]' : msg.content
        }))
      }
    }
    return body
  } catch {
    return null
  }
}