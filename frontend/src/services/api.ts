import axios from 'axios';
import { Blueprint, Contract, ContractStatus } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blueprintApi = {
  getAll: async (): Promise<Blueprint[]> => {
    const { data } = await api.get('/blueprints');
    return data;
  },

  getById: async (id: string): Promise<Blueprint> => {
    const { data } = await api.get(`/blueprints/${id}`);
    return data;
  },

  create: async (blueprint: { name: string; fields: any[] }): Promise<Blueprint> => {
    const { data } = await api.post('/blueprints', blueprint);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/blueprints/${id}`);
  },
};

export const contractApi = {
  getAll: async (status?: string): Promise<Contract[]> => {
    const { data } = await api.get('/contracts', {
      params: status ? { status } : {},
    });
    return data;
  },

  getById: async (id: string): Promise<Contract> => {
    const { data } = await api.get(`/contracts/${id}`);
    return data;
  },

  create: async (contract: {
    name: string;
    blueprintId: string;
    values?: Record<string, any>;
  }): Promise<Contract> => {
    const { data } = await api.post('/contracts', contract);
    return data;
  },

  updateStatus: async (id: string, status: ContractStatus): Promise<Contract> => {
    const { data } = await api.patch(`/contracts/${id}/status`, { status });
    return data;
  },

  updateValues: async (id: string, values: Record<string, any>): Promise<Contract> => {
    const { data } = await api.patch(`/contracts/${id}/values`, { values });
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/contracts/${id}`);
  },
};