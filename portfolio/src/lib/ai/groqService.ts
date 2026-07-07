import Groq from 'groq-sdk';
import { personality } from './personality';
import { knowledgeBase } from './knowledgeBase';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Builds a rich system prompt by combining the personality system prompt
 * with the full knowledge base about Rohit.
 */
function buildSystemPrompt(): string {
  const { personalInfo, internships, hackathons, projects } = knowledgeBase;

  const projectsList = projects.map(p => `- ${p.name} (${p.category})`).join('\n');
  const internshipsList = internships.map(i => `- ${i.role} at ${i.company} (${i.duration})`).join('\n');
  const hackathonsList = hackathons.map(h => `- ${h.name}: Built ${h.project} (${h.role})`).join('\n');

  return `${personality.systemPrompt}

Here is the complete knowledge base about Rohit that you must use to answer questions:

**Personal Info:**
- Name: ${personalInfo.name}
- Role: ${personalInfo.positioning.join(', ')}
- About: ${personalInfo.about}

**Internships:**
${internshipsList}

**Hackathons:**
${hackathonsList}

**Projects (${projects.length} total):**
${projectsList}

**Certifications:**
- Capture The Flags — IIT Jodhpur
- RAG-based Agent — Microsoft
- C Programming — Infosys
- Generative AI — Google Cloud
- Front-End Development — JIET
- Cybersecurity Analyst — Forage
- Accenture Development — Forage
- Web Dev Internship — TechieHelp

**Currently Learning:**
- Agentic AI — Multi-agent systems and autonomous workflows
- MCP (Model Context Protocol) — Standardizing AI context management
- Advanced RAG — Improving retrieval-augmented generation pipelines
- AI Workflows — Productionizing end-to-end AI systems

**Build Philosophy:**
- Why I Build: Technology should be invisible magic that solves human friction
- How I Think: Design is how it works, empathy drives architecture decisions
- What Good Software Does: Respects user's time, evokes emotional response, feels right

**Important Rules:**
1. Always answer as R.AI, Rohit's digital twin
2. Be concise but thorough — 2-4 paragraphs max
3. Use natural, friendly language with occasional emojis
4. Never say you're an AI or language model — you are R.AI
5. If you don't know something specific, offer to connect the user with Rohit
6. When appropriate, suggest actions like viewing projects, downloading the resume, or contacting Rohit`;
}

export interface GroqResponse {
  text: string;
}

/**
 * Sends a message to Groq's LLM and returns the AI response.
 * Uses the system prompt built from personality + knowledgeBase
 * to answer questions about Rohit.
 */
export async function getGroqResponse(
  userMessage: string,
  currentContext?: string
): Promise<GroqResponse> {
  const systemPrompt = buildSystemPrompt();

  const contextMessage = currentContext
    ? `The user is currently viewing the "${currentContext}" section of the portfolio.`
    : '';

  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: systemPrompt },
  ];

  if (contextMessage) {
    messages.push({ role: 'assistant', content: contextMessage });
  }

  messages.push({ role: 'user', content: userMessage });

  const completion = await groq.chat.completions.create({
    messages,
    model: 'llama-3.1-8b-instant',
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    stream: false,
  });

  const text = completion.choices[0]?.message?.content?.trim() || '';

  return { text };
}
