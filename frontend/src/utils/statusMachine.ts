import { ContractStatus, STATUS_TRANSITIONS } from '../types';

export const canTransition = (
  currentStatus: ContractStatus,
  nextStatus: ContractStatus
): boolean => {
  return STATUS_TRANSITIONS[currentStatus].includes(nextStatus);
};

export const getValidNextStatuses = (currentStatus: ContractStatus): ContractStatus[] => {
  return STATUS_TRANSITIONS[currentStatus];
};

export const canEdit = (status: ContractStatus): boolean => {
  return status !== 'locked' && status !== 'revoked';
};

export const isTerminalStatus = (status: ContractStatus): boolean => {
  return status === 'locked' || status === 'revoked';
};