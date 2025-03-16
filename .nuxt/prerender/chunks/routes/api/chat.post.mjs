import OpenAI from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/openai/index.mjs';
import { defineEventHandler, readBody, createError } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/h3/dist/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const DEFAULT_SYSTEM_PROMPT = `You are CoachApp, an AI assistant helping entrepreneurs validate and develop their business ideas.
Your role is to:
- Be concise and practical in your responses
- Focus on actionable advice
- Be encouraging while remaining realistic
- Use data and market knowledge to inform recommendations
- Help identify potential risks and opportunities
- Guide entrepreneurs through the validation process

Keep responses focused and to-the-point while maintaining a supportive tone.`;
const chat_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const body = await readBody(event);
    console.log("[OpenAI] Request:", {
      model: "gpt-3.5-turbo",
      messageCount: body.messages.length,
      firstUserMessage: (_a = body.messages.find((m) => m.role === "user")) == null ? void 0 : _a.content
    });
    const { messages, systemPrompt = DEFAULT_SYSTEM_PROMPT } = body;
    if (!messages.find((m) => m.role === "system")) {
      messages.unshift({
        role: "system",
        content: systemPrompt
      });
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 2e3,
      presence_penalty: 0.3,
      // Encourage some creativity
      frequency_penalty: 0.5
      // Reduce repetition
    });
    console.log("[OpenAI] Response:", {
      status: "success",
      usage: completion.usage,
      responseLength: completion.choices[0].message.content.length
    });
    return {
      message: completion.choices[0].message,
      usage: completion.usage
    };
  } catch (error) {
    console.error("[OpenAI] Error:", {
      message: error.message,
      code: error.code,
      type: error.type
    });
    console.error("OpenAI API Error:", error);
    throw createError({
      statusCode: 500,
      message: "Error communicating with AI service: " + error.message
    });
  }
});

export { chat_post as default };
//# sourceMappingURL=chat.post.mjs.map
