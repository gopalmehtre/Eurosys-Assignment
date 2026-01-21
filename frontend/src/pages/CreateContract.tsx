import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Blueprint } from '../types';
import { ContractForm } from '../components/forms/ContractForm';
import { Card } from '../components/ui/Card';

export const CreateContract: React.FC = () => {
  const navigate = useNavigate();
  const { blueprints, loadingBlueprints, fetchBlueprints, createContract } = useStore();
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);

  useEffect(() => {
    fetchBlueprints();
  }, [fetchBlueprints]);

  const handleCreate = async (data: { name: string; values: Record<string, any> }) => {
    if (!selectedBlueprint) return;

    try {
      await createContract({
        name: data.name,
        blueprintId: selectedBlueprint.id,
        values: data.values,
      });
      alert('Contract created successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to create contract');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create Contract</h1>

      {!selectedBlueprint ? (
        <Card title="Select Blueprint">
          {loadingBlueprints ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading blueprints...</p>
            </div>
          ) : blueprints.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No blueprints available. Please create a blueprint first.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {blueprints.map((blueprint) => (
                <button
                  key={blueprint.id}
                  onClick={() => setSelectedBlueprint(blueprint)}
                  className="text-left border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{blueprint.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {blueprint.fields.length} field{blueprint.fields.length !== 1 ? 's' : ''}
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>
      ) : (
        <ContractForm
          blueprint={selectedBlueprint}
          onSubmit={handleCreate}
          onCancel={() => setSelectedBlueprint(null)}
        />
      )}
    </div>
  );
};