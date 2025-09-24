import openAiClient from "../config/openai.js";
import { getExpenseData } from "../utils/expenseHelper.js";
import Expense from "../models/expense.js";
import mongoose from "mongoose";

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
  "severity": "ok" | "caution" | "alert"
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

export const chatWithAi = async (req, resp) => {
  const { query } = req.query;

  if (!query) {
    resp.status(400).json({
      message: "query is required",
    });
  }

  const prompt = `You are an assistant for an expense management app.  
Your job is to decide which operation the user wants and — WHEN the operation is "list_expense " — return a **MongoDB aggregation pipeline** (an array of BSON-style stage objects) that can be passed directly to collection.aggregate(pipeline).

Rules / output format:
1. Always return a single valid JSON object and **nothing else**.
2. Top-level fields:
   {
     "operation": "add_expense" | "list_expense" | "unknown",
     // when add_expense: include expense_data
     // when unknown: include advisor_message
     // when list_expense: include "pipeline"
   }

3. For add_expense:
   {
     "operation": "add_expense",
     "expense_data": {
       "title": string,
       "description": string[write this based on the title and the user query],
       "rs": number,
       "paymentMethod": string,
       "createdAt": string (ISO date if provided, otherwise "now", make sure it's in UTC'),
       "hidden": boolean (if provided),
       "screenshot": string (if rovided)
       // userId should not be set by LLM, it will be injected by backend
     }
   }
p
4. For list_expense produce:
   {
     "operation": "list_expense",
     "pipeline": [ /* array of aggregation stage objects */ ],
     "metadata": { "explain": "short human reason for pipeline (optional)" }
   }

5. Pipeline rules:
   - Pipeline must be an **array** of JSON objects where each object is a valid aggregation stage (e.g. { "$match": {...} }, { "$group": {...} }, { "$sort": {...} }, { "$limit": n }, { "$skip": n }, { "$project": {...} }, { "$facet": {...} } ).
   - Dates must use \`createdAt\` (not "date"). Format as ISO8601 strings (YYYY-MM-DD or full ISO datetime) or numeric epoch millis. Example: "2025-09-01T00:00:00Z".
   - Allowed top-level fields to match on: createdAt, rs, paymentMethod, title, description, hidden, screenshot, userId.
   - Allowed operators in $match: $gte, $lte, $gt, $lt, $eq, $in, $nin, $exists. Do NOT use $where, $function, $accumulator or any server-side JS.
   - If user requests totals/summary, include a $group stage that returns { _id: <group-by>, totalRs: { $sum: "$rs" }, count: { $sum: 1 } }.
   - Always include a safety {$limit: <reasonable>} stage if the user asked a broad range (default limit = 100).
   - If pagination requested, include $skip and $limit with keys page and page_size translated (page 1 => skip 0).
   - For relative date phrases (e.g., "last 7 days", "this month", "last month"), convert them into explicit ISO $gte and $lte ranges on createdAt.
   - If grouping requested (by day/month/paymentMethod), use $group with $sum on rs.
   - IMPORTANT: When producing a MongoDB aggregation pipeline in JSON, ALWAYS use MongoDB Extended JSON for non-JSON-native types so the output is valid JSON and can be parsed/converted server-side.
    
  
    
    
6. Example pipelines:

Example A — last 7 days, paid by cash, sort newest first, limit 100:
{
  "operation": "list_expense",
  "pipeline": [
    { "$match": {
      
        "createdAt": { "$gte": "2025-09-16T00:00:00Z", "$lte": "2025-09-23T23:59:59Z" },
        "paymentMethod": "cash"
    }},
    { "$sort": { "createdAt": -1 } },
    { "$limit": 100 }
  ],
  "metadata": { "explain": "last 7 days, cash payments" }
}

Example B — totals per paymentMethod for September 2025:
{
  "operation": "list_expense",
  "pipeline": [
    { "$match":  { "createdAt": { "$gte": "2025-09-01T00:00:00Z", "$lte": "2025-09-30T23:59:59Z" } } },
    { "$group": { "_id": "$paymentMethod", "totalRs": { "$sum": "$rs" }, "count": { "$sum": 1 } } },
    { "$project": { "paymentMethod": "$_id", "totalRs": 1, "count": 1, "_id": 0 } },
    { "$sort": { "totalRs": -1 } }
  ],
  "metadata": { "explain": "monthly totals grouped by paymentMethod" }
}

Example C — filter by rs range and payment methods:
{
  "operation": "list_expense",
  "pipeline": [
    { "$match": {
        "rs": { "$gte": 100, "$lte": 5000 },
        "paymentMethod": { "$in": ["upi", "card"] }
    }},
    { "$sort": { "rs": -1 } },
    { "$limit": 100 }
  ]
}

7. If the user query is not about expenses, return:
{
  "operation": "unknown",
  "advisor_message": "<short helpful financial advice>"
}

8. Never include code, markdown or extra text — only the valid JSON described above.
            user query: ${query}
            `;

  const response = await openAiClient.responses.create({
    model: "gpt-5-mini",
    input: prompt,
  });

  console.log(response.output_text);

  const responseObj = JSON.parse(response.output_text);

  //lest parse the response: and perform operations
  if (!response || !responseObj.operation) {
    return resp.status(200).json({
      message: "I dont understand you query , please try again",
    });
  }

  // add expense operation
  if (responseObj.operation === "add_expense") {
    const expenseData = responseObj.expense_data;

    if (!expenseData.rs) {
      return resp.status(200).json({
        message: "Please include the amount in query",
      });
    }

    await Expense.create({
      title: expenseData.title,
      description: expenseData.description,
      rs: expenseData.rs,
      paymentMethod: expenseData.paymentMethod,
      userId: req.userId,
      hidden: false,
      createdAt: responseObj.createdAt,
    });

    return resp.status(200).json({
      operation: "add_expense",
      message: "🎉Congrats, you expense added successfully",
    });
  }

  // list expense operation

  if (responseObj.operation === "list_expense") {
    let pipeline = responseObj.pipeline;

    pipeline = injectUserMatch(pipeline, req.userId);
    pipeline = normalizePipeline(pipeline);

    console.log("------------");
    console.log(pipeline);

    const result = await Expense.aggregate(pipeline).exec();
    return resp.status(200).json({
      operation: "list_expense",
      result: result,
      message: responseObj.metadata?.explain,
    });
  }

  resp.send(response.output_text);
};

function injectUserMatch(pipeline, userId) {
  const matchStage = {
    $match: { userId: new mongoose.Types.ObjectId(userId) },
  };

  // if pipeline is empty, just add match
  if (!pipeline || pipeline.length === 0) {
    return [matchStage];
  }

  // if first stage is already $match → merge
  if (pipeline[0].$match) {
    pipeline[0].$match.userId = new mongoose.Types.ObjectId(userId);
    return pipeline;
  }

  // else insert $match at the beginning
  return [matchStage, ...pipeline];
}

/**
 * Ensure `$match.createdAt` is in correct Date format.
 * - Converts string values to Date
 * - Leaves untouched if not present
 */
function normalizePipeline(pipeline) {
  if (!Array.isArray(pipeline) || pipeline.length === 0) return pipeline;

  // Ensure first stage is $match
  if (!pipeline[0].$match) {
    pipeline.unshift({ $match: {} });
  }

  const match = pipeline[0].$match;

  // Convert createdAt bounds to Date objects if present
  if (match.createdAt && typeof match.createdAt === "object") {
    ["$gte", "$lte", "$gt", "$lt"].forEach((op) => {
      if (match.createdAt[op] != null) {
        const val = match.createdAt[op];
        const date =
          typeof val === "string" || typeof val === "number"
            ? new Date(val)
            : val;
        if (!isNaN(date?.getTime?.())) {
          match.createdAt[op] = date;
        } else {
          // invalid date → remove the constraint
          delete match.createdAt[op];
        }
      }
    });
    // if createdAt object became empty, remove it
    if (Object.keys(match.createdAt).length === 0) delete match.createdAt;
  }

  // Ensure userId is ObjectId
  if (match.userId != null) {
    // if it's Extended JSON { $oid: "..." }
    if (typeof match.userId === "object" && match.userId.$oid) {
      if (/^[0-9a-fA-F]{24}$/.test(match.userId.$oid)) {
        match.userId = new mongoose.Types.ObjectId(match.userId.$oid);
      } else {
        delete match.userId;
      }
    } else if (typeof match.userId === "string") {
      if (/^[0-9a-fA-F]{24}$/.test(match.userId)) {
        match.userId = new mongoose.Types.ObjectId(match.userId);
      } else {
        delete match.userId;
      }
    } // else assume it's already ObjectId
  }

  return pipeline;
}
