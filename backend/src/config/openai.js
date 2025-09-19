import OpenAI from "openai";
import { OPEN_AI_KEY } from "../utils/constants.js";
// import { OPEN_AI_KEY } from "../utils/constants.js";

const openAiClient = new OpenAI({
  apiKey: OPEN_AI_KEY,
});

export default openAiClient;
