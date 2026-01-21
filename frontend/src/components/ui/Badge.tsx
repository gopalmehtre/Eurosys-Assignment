import React from 'react';
import { ContractStatus, STATUS_LABELS, STATUS_COLORS } from '../../types';

interface BadgeProps {
  status: ContractStatus;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};