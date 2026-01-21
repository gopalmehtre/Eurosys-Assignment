import React, { useState } from 'react';
import { Blueprint } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface ContractFormProps {
  blueprint: Blueprint;
  onSubmit: (data: { name: string; values: Record<string, any> }) => void;
  onCancel?: () => void;
  initialValues?: Record<string, any>;
  readOnly?: boolean;
}

export const ContractForm: React.FC<ContractFormProps> = ({
  blueprint,
  onSubmit,
  onCancel,
  initialValues = {},
  readOnly = false,
}) => {
  const [name, setName] = useState('');
  const [values, setValues] = useState<Record<string, any>>(initialValues);

  const handleFieldChange = (fieldId: string, value: any) => {
    setValues({ ...values, [fieldId]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onSubmit({ name, values });
  };

  const renderField = (field: any) => {
    const fieldValue = values[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            label={field.label}
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            disabled={readOnly}
            required
          />
        );
      case 'date':
        return (
          <Input
            label={field.label}
            type="date"
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            disabled={readOnly}
            required
          />
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.id}
              checked={fieldValue || false}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              disabled={readOnly}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={field.id} className="text-sm font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        );
      case 'signature':
        return (
          <Input
            label={field.label + ' (Signature)'}
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder="Type your name to sign"
            disabled={readOnly}
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card title="Contract Details">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Blueprint: <span className="font-medium">{blueprint.name}</span>
          </p>
        </div>
        {!readOnly && (
          <Input
            label="Contract Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Doe - Employment Contract"
            required
          />
        )}
      </Card>

      <Card title="Contract Fields">
        <div className="space-y-4">
          {blueprint.fields.map((field) => (
            <div key={field.id}>{renderField(field)}</div>
          ))}
        </div>
      </Card>

      {!readOnly && (
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button type="button" onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={!name}>
            Create Contract
          </Button>
        </div>
      )}
    </form>
  );
};