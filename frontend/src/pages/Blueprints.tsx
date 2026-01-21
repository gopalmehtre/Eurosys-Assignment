import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { BlueprintForm } from '../components/forms/BlueprintForm';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Blueprints: React.FC = () => {
  const { blueprints, loadingBlueprints, fetchBlueprints, createBlueprint, deleteBlueprint } =
    useStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBlueprints();
  }, [fetchBlueprints]);

  const handleCreate = async (data: { name: string; fields: any[] }) => {
    try {
      await createBlueprint(data);
      setShowForm(false);
      alert('Blueprint created successfully!');
    } catch (error) {
      alert('Failed to create blueprint');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blueprint?')) return;
    try {
      await deleteBlueprint(id);
      alert('Blueprint deleted successfully!');
    } catch (error) {
      alert('Failed to delete blueprint');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Blueprints</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Create Blueprint</Button>
        )}
      </div>

      {showForm ? (
        <BlueprintForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      ) : (
        <Card>
          {loadingBlueprints ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading blueprints...</p>
            </div>
          ) : blueprints.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No blueprints found. Create one to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {blueprints.map((blueprint) => (
                <div
                  key={blueprint.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{blueprint.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {blueprint.fields.length} field{blueprint.fields.length !== 1 ? 's' : ''}
                      </p>
                      <div className="mt-3 space-y-1">
                        {blueprint.fields.map((field) => (
                          <div
                            key={field.id}
                            className="text-sm text-gray-600 flex items-center space-x-2"
                          >
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                              {field.type}
                            </span>
                            <span>{field.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDelete(blueprint.id)}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};