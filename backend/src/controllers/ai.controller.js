import openAiClient from "../config/openai.js";

export const getSuggestions = async (req, resp) => {
  // last 7 days of expense data

  const prompt = `
  The user has just logged in. Show a random short motivational quote related to money, savings, or wealth-building. Keep it positive and inspiring with in 2 paragraph.
  `;

  const response = await openAiClient.responses.create({
    model: "gpt-5-mini",
    instructions: "You are a finance expert.",
    input: prompt,
  });

  console.log(response.output_text);
  resp.send(response.output_text);
};
