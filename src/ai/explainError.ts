export async function explainError(
  errorMessage: string,
  codeContext: string,
  apiKey: string,
  modelName: string
): Promise<string> {
  const { ChatOpenAI } = await import("langchain/chat_models/openai");
  const { HumanMessage, SystemMessage } = await import("langchain/schema");
  const chatModel = new ChatOpenAI({
    openAIApiKey: apiKey,
    modelName,
    temperature: 0.7,
  });
  const messages = [
    new SystemMessage(
      `You are an expert programming assistant. Your task is to explain errors in a clear, concise, and helpful way. Focus on: 1. What the error means in simple terms 2. Why this error typically occurs 3. How to fix it 4. Best practices to avoid this error. Keep the explanation friendly and practical.`
    ),
    new HumanMessage(
      `Error: ${errorMessage}\n\nCode Context:\n${codeContext}\n\nPlease explain this error.`
    ),
  ];
  const response = await chatModel.call(messages);
  let content = response.content;
  if (Array.isArray(content)) {
    content = content.join(" ");
  }
  return typeof content === "string" ? content : String(content);
}
