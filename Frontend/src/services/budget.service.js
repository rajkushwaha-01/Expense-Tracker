import api from './api'; export const budgetService = { updateBudget: async (data) => (await api.put('/budget', data)).data };
