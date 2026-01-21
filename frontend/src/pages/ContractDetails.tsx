import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contractApi } from '../services/api';
import { Contract, ContractStatus } from '../types';
import { useStore } from '../store';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getValidNextStatuses, canEdit } from '../utils/statusMachine';

export const ContractDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateContractStatus } = useStore();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContract();
  }, [id]);

  const loadContract = async () => {
    if (!id) return;
    try {
      const data = await contractApi.getById(id);
      setContract(data);
    } catch (error) {
      alert('Failed to load contract');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: ContractStatus) => {
    if (!contract || !id) return;

    try {
      await updateContractStatus(id, newStatus);
      await loadContract();
      alert('Contract status updated successfully!');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading contract...</p>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Contract not found</p>
      </div>
    );
  }

  const validNextStatuses = getValidNextStatuses(contract.status);
  const isEditable = canEdit(contract.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{contract.name}</h1>
        <Button onClick={() => navigate('/')} variant="secondary">
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card title="Contract Information">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Blueprint:</span>
                <p className="text-gray-900">{contract.blueprintName || 'Unknown'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <div className="mt-1">
                  <Badge status={contract.status} />
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Created:</span>
                <p className="text-gray-900">{new Date(contract.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Editable:</span>
                <p className="text-gray-900">{isEditable ? 'Yes' : 'No (Locked/Revoked)'}</p>
              </div>
            </div>
          </Card>

          <Card title="Field Values">
            {contract.blueprint ? (
              <div className="space-y-4">
                {contract.blueprint.fields.map((field) => (
                  <div key={field.id} className="border-b border-gray-200 pb-3 last:border-0">
                    <span className="text-sm font-medium text-gray-500">{field.label}:</span>
                    <p className="text-gray-900 mt-1">
                      {field.type === 'checkbox'
                        ? contract.values[field.id]
                          ? 'Yes'
                          : 'No'
                        : contract.values[field.id] || 'Not provided'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No field data available</p>
            )}
          </Card>
        </div>

        <div>
          <Card title="Actions">
            <div className="space-y-3">
              {validNextStatuses.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 mb-3">Change status to:</p>
                  {validNextStatuses.map((status) => (
                    <Button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      variant={status === 'revoked' ? 'danger' : 'primary'}
                      className="w-full"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </>
              ) : (
                <p className="text-sm text-gray-500">No actions available for this status</p>
              )}
            </div>
          </Card>

          <Card title="Lifecycle" className="mt-6">
            <div className="space-y-2 text-sm">
              <div
                className={`p-2 rounded ${
                  contract.status === 'created' ? 'bg-blue-100' : 'bg-gray-50'
                }`}
              >
                Created
              </div>
              <div
                className={`p-2 rounded ${
                  contract.status === 'approved' ? 'bg-blue-100' : 'bg-gray-50'
                }`}
              >
                Approved
              </div>
              <div
                className={`p-2 rounded ${
                  contract.status === 'sent' ? 'bg-blue-100' : 'bg-gray-50'
                }`}
              >
                Sent
              </div>
              <div
                className={`p-2 rounded ${
                  contract.status === 'signed' ? 'bg-blue-100' : 'bg-gray-50'
                }`}
              >
                Signed
              </div>
              <div
                className={`p-2 rounded ${
                  contract.status === 'locked' ? 'bg-blue-100' : 'bg-gray-50'
                }`}
              >
                Locked
              </div>
              {contract.status === 'revoked' && (
                <div className="p-2 rounded bg-red-100">Revoked</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};