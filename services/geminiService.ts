import { GoogleGenAI, Type } from "@google/genai";
import { type LearningTopic, type UserLevel, type TopicContentData } from '../types';

// Fix: Initialize GoogleGenAI client strictly with process.env.API_KEY per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const funFactSchema = {
    type: Type.OBJECT,
    properties: {
        topicTitle: { type: Type.STRING, description: "The title of the most logical next topic, which should be the first suggestion in the 'followUpSuggestions' list." },
        fact: { type: Type.STRING, description: "A surprising and engaging fun fact about that specific next topic. Should be concise (max 2 sentences)." }
    },
    required: ["topicTitle", "fact"]
};

const topicContentSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The title for this specific chapter or explanation." },
        explanation: { type: Type.STRING, description: "A detailed explanation of the topic, formatted with rich Markdown (bold, italics, lists, etc.). Analogies and fun facts should be woven naturally into this text." },
        followUpSuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-4 diverse and engaging follow-up suggestions for the user. These will become the title of the next chapter if clicked. Examples: 'Explain [a key concept] in simple terms', 'Show me a simple code example of this', 'How does this relate to [another topic]?', 'Okay, I'm ready for the next main topic.'"
        },
        funFactForNextTopic: funFactSchema
    },
    required: ["title", "explanation", "followUpSuggestions", "funFactForNextTopic"]
};


export const generateTopic = async (
  mainTopic: LearningTopic,
  requestedTopicTitle: string,
  level: UserLevel,
  history: string[]
): Promise<TopicContentData> => {
    try {
        const historyPrompt = history.length > 0 ? `They have already covered the following topics in this session: ${history.join(', ')}.` : "This is their first topic.";

        const prompt = `
        You are Agent-E creating a dynamic, chapter-by-chapter learning path. Your goal is to make learning incredibly engaging, colorful, and fun!
        The user's main subject is "${mainTopic.title}".
        Their self-assessed knowledge level is: "${level}".
        ${historyPrompt}
        
        Please generate the content for the next chapter, which is titled: "${requestedTopicTitle}".

        Your response must include four parts:
        1.  **title**: Create a clear and engaging title for this specific chapter. It should reflect "${requestedTopicTitle}".
        2.  **explanation**: Provide a clear, well-structured explanation.
            - **Format using rich Markdown**: use headings, bold, italics, and bulleted lists.
            - **USE LOTS OF EMOJIS!** 🤩 Sprinkle in a generous amount of relevant emojis to make the content lively (e.g., 💡, 🧠, ✨, ✅, 🚀, 🎉).
            - **Weave simple analogies and fun facts directly into the main explanation.** They should feel like a natural part of the conversation.
        3.  **followUpSuggestions**: Based on the explanation you just wrote, generate a list of 3-4 diverse and engaging follow-up suggestions. These suggestions will become the title of the next chapter if clicked. They should be varied. Good examples:
            - A "drill-down" question (e.g., "Explain what 'tokens' are in simple terms.")
            - A practical request (e.g., "Show me a simple code example of a prompt.")
            - A broader question (e.g., "How does this relate to cloud computing?")
            - A way to move on (e.g., "Okay, let's learn how LLMs are used in the real world.")
        4.  **funFactForNextTopic**: Look at the VERY FIRST suggestion you generated in 'followUpSuggestions'. This is the most likely next chapter. Provide a single, surprising fun fact related to THAT specific upcoming topic. This fact will be shown to the user while the next chapter loads.
            - **topicTitle**: The title of that next topic (must match the first suggestion).
            - **fact**: The fun fact itself.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: topicContentSchema,
                temperature: 0.7,
            },
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as TopicContentData;

    } catch (error) {
        console.error("Error generating topic content:", error);
        throw new Error("Failed to generate topic content. Please try again.");
    }
};

export const generateFunFact = async (topicTitle: string): Promise<string> => {
    try {
        const prompt = `Tell me one surprising and fun fact about "${topicTitle}". Be concise and start directly with the fact. Maximum 2 sentences. Make it engaging!`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.8,
            }
        });

        return response.text.trim();

    } catch (error) {
        console.warn("Could not generate fun fact:", error);
        return ""; // Return empty string on failure so it doesn't break the UI
    }
}