import api from './api'; export const incomeService = { getIncomes: async () => (await api.get('/income')).data, createIncome: async (data) => (await api.post('/income', data)).data };
