import client from "./client";

export const getSpendingAnalysisApi = () =>
  client.get("/ai/spending-analysis").then((r) => r.data);

export const askFinancialQuestionApi = (question) =>
  client.post("/ai/ask", { question }).then((r) => r.data);
