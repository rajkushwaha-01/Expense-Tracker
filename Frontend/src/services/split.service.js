import api from './api'; export const splitService = { getSplits: async () => (await api.get('/splits')).data, createSplit: async (data) => (await api.post('/splits', data)).data };
