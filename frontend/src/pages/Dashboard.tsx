import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { ContractTable } from '../components/dashboard/ContractTable';
import { Card } from '../components/ui/Card';

type FilterType = 'all' | 'active' | 'pending' | 'signed';

export const Dashboard: React.FC = () => {
  const { contracts, loadingContracts, fetchContracts } = useStore();
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const getFilteredContractsForType = (type: FilterType) => {
    switch (type) {
      case 'active':
        return contracts.filter((c) => c.status === 'created' || c.status === 'approved');
      case 'pending':
        return contracts.filter((c) => c.status === 'sent');
      case 'signed':
        return contracts.filter((c) => c.status === 'signed' || c.status === 'locked');
      default:
        return contracts;
    }
  };

  const filteredContracts = getFilteredContractsForType(filter);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'pending', label: 'Pending' },
    { key: 'signed', label: 'Signed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contract Dashboard</h1>
      </div>

      <Card>
        <div className="flex space-x-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label} ({getFilteredContractsForType(f.key).length})
            </button>
          ))}
        </div>

        {loadingContracts ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading contracts...</p>
          </div>
        ) : (
          <ContractTable contracts={filteredContracts} />
        )}
      </Card>
    </div>
  );
};