import { ContractStatus, STATUS_TRANSITIONS } from '../types';

export class ContractLifecycleService {
  
  static canTransition(currentStatus: ContractStatus, nextStatus: ContractStatus): boolean {
    const allowedTransitions = STATUS_TRANSITIONS[currentStatus];
    return allowedTransitions.includes(nextStatus);
  }

  static getValidNextStatuses(currentStatus: ContractStatus): ContractStatus[] {
    return STATUS_TRANSITIONS[currentStatus];
  }

  static canEdit(status: ContractStatus): boolean {
    return status !== 'locked' && status !== 'revoked';
  }

  static validateTransition(currentStatus: ContractStatus, nextStatus: ContractStatus): void {
    if (!this.canTransition(currentStatus, nextStatus)) {
      throw new Error(
        `Invalid transition from ${currentStatus} to ${nextStatus}. ` +
        `Allowed transitions: ${STATUS_TRANSITIONS[currentStatus].join(', ') || 'none'}`
      );
    }
  }
}