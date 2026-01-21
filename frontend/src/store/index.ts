import { create } from 'zustand';
import { Blueprint, Contract, ContractStatus } from '../types';
import { blueprintApi, contractApi } from '../services/api';

interface AppState {
  blueprints: Blueprint[];
  loadingBlueprints: boolean;
  fetchBlueprints: () => Promise<void>;
  createBlueprint: (blueprint: { name: string; fields: any[] }) => Promise<Blueprint>;
  deleteBlueprint: (id: string) => Promise<void>;

  contracts: Contract[];
  loadingContracts: boolean;
  fetchContracts: (status?: string) => Promise<void>;
  createContract: (contract: { name: string; blueprintId: string; values?: Record<string, any> }) => Promise<Contract>;
  updateContractStatus: (id: string, status: ContractStatus) => Promise<Contract>;
  updateContractValues: (id: string, values: Record<string, any>) => Promise<Contract>;
  deleteContract: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  blueprints: [],
  loadingBlueprints: false,

  fetchBlueprints: async () => {
    set({ loadingBlueprints: true });
    try {
      const blueprints = await blueprintApi.getAll();
      set({ blueprints, loadingBlueprints: false });
    } catch (error) {
      console.error('Failed to fetch blueprints:', error);
      set({ loadingBlueprints: false });
    }
  },

  createBlueprint: async (blueprint) => {
    const newBlueprint = await blueprintApi.create(blueprint);
    set({ blueprints: [newBlueprint, ...get().blueprints] });
    return newBlueprint;
  },

  deleteBlueprint: async (id) => {
    await blueprintApi.delete(id);
    set({ blueprints: get().blueprints.filter((bp) => bp.id !== id) });
  },

  // Contracts state
  contracts: [],
  loadingContracts: false,

  fetchContracts: async (status?: string) => {
    set({ loadingContracts: true });
    try {
      const contracts = await contractApi.getAll(status);
      set({ contracts, loadingContracts: false });
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
      set({ loadingContracts: false });
    }
  },

  createContract: async (contract) => {
    const newContract = await contractApi.create(contract);
    set({ contracts: [newContract, ...get().contracts] });
    return newContract;
  },

  updateContractStatus: async (id, status) => {
    const updated = await contractApi.updateStatus(id, status);
    set({
      contracts: get().contracts.map((c) => (c.id === id ? updated : c)),
    });
    return updated;
  },

  updateContractValues: async (id, values) => {
    const updated = await contractApi.updateValues(id, values);
    set({
      contracts: get().contracts.map((c) => (c.id === id ? updated : c)),
    });
    return updated;
  },

  deleteContract: async (id) => {
    await contractApi.delete(id);
    set({ contracts: get().contracts.filter((c) => c.id !== id) });
  },
}));