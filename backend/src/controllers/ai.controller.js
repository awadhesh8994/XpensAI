import openAiClient from "../config/openai.js";
import { getExpenseData } from "../utils/expenseHelper.js";

export const getSuggestions = async (req, resp) => {
  // last 7 days of expense data

  const data = await getExpenseData(req.userId);
  console.log(data);

  const prompt = `You are a concise UI and financial calculator assistant for a personal finance dashboard.
Input: a JSON object with fields like period, currency, totalForTheWeek, totalPreviousWeek, payMethodUsedBreakdown, dailyBreakdown (list of dates + amounts for each day in ISO YYYY-MM-DD),  recentTransactions, and optional weeklyBudget and locale.

Return: ONLY valid JSON (no prose, no backticks). The JSON must match the Response Schema below exactly. Use currency formatting hints only in strings and do not change numeric fields.
Rules:
1. Headline: 1 short sentence summarizing total for the period and a simple trend vs previous period (up/down/flat). If previous_total is missing, omit the comparative phrase.
2. topPaymentMethodUsed must include pct = (top_category.amount / total * 100) rounded to one decimal. If total is 0, set pct to 0.
3. trend field: "up" if total > previous_total by at least 2%, "down" if total < previous_total by at least 2%, else "flat". If previous_total missing, use "flat".
4. chart: produce sparkline series of daily amounts in the same order as daily_breakdown and matching labels of same dates.
5. Provide a short 1-line actionable tip in action.tip (≤ 10 words).
6. Provide severity: "ok", "caution", or "alert" based on budget_limits (if user exceeded any budget by >5% => "alert"; if within 0-10% => "caution"; otherwise "ok"). If no budget_limits, set "ok".
7. For recent_transactions, include up to 5 most-recent transactions from input, sorted newest first chart data [label:date and amount]
8. Use ISO dates (YYYY-MM-DD) everywhere.
9. Numeric fields must be numbers (no formatting). Strings may include currency symbol when shown to the user (e.g., "₹5,423") but numeric fields stay numeric.
10. Keep headline ≤ 25 words. Keep tip ≤ 10 words.
11. Add one field 'tip' : provide one best tip to reduced user expense based on given data . keep tip<30 words.

Response Schema (return JSON exactly following this schema):
{
  "headline": string,
  "total": number,
  "currency": string,
  "trend": "up" | "down" | "flat",
  "pct_change": number,                // percent change vs previous_total, rounded to 1 decimal; if previous_total missing -> 0
  "topPaymentMethodUsed": { "name": string, "amount": number, "pct": number },
  "peakDay": { "date": "YYYY-MM-DD", "amount": number },
  "chart": { "type": "sparkline", "series": [number,...], "labels": ["YYYY-MM-DD", ...] },
  "paymentMethodBreakdown": [ { "method": string, "amount": number } ],
  "recentTransactions": [ { "id": string, "title": string, "description": string, "amount": number, "date": "YYYY-MM-DD", "paymentmethod": string } ],
  "action": { "label": string, "url": string, "tip": string },
  "severity": "ok" | "caution" | "alert",
  "tip":string
}


Input :

${JSON.stringify(data)}
`;
  console.log(prompt);

  //
  // const prompt = `
  // The user has just logged in. Show a random short motivational quote related to money, savings, or wealth-building. Keep it positive and inspiring with in 2 paragraph.
  // `;
  //
  const response = await openAiClient.responses.create({
    model: "gpt-5-mini",
    instructions: "You are a finance expert.",
    input: prompt,
  });
  //
  console.log(response.output_text);
  resp.send(response.output_text);
  // resp.send("hello");
};
