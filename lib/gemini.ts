import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is not defined in the environment variables.",
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeWithGemini(
  text: string,
  analysisType: "summary" | "qa" | "sentiment" | "entities" | "extract",
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = buildPrompt(text, analysisType);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const content = response.text();

    return content;
  } catch (error) {
    console.error("Error analyzing with Gemini:", error);
    throw error;
  }
}

function buildPrompt(text: string, analysisType: string): string {
  const prompts: { [key: string]: string } = {
    summary: `Provide a concise summary of the following text:\n\n${text}`,
    qa: `Generate common Q&A points from this text:\n\n${text}`,
    sentiment: `Analyze the sentiment of this text (positive, negative, neutral):\n\n${text}`,
    entities: `Extract key entities (names, places, organizations) from this text:\n\n${text}`,
    extract: `Extract the main points and keywords from this text:\n\n${text}`,
  };

  return prompts[analysisType] || prompts.summary;
}
