import React, { useState } from 'react';
import { Field, FieldType } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface BlueprintFormProps {
  onSubmit: (data: { name: string; fields: Field[] }) => void;
  onCancel?: () => void;
}

export const BlueprintForm: React.FC<BlueprintFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [currentField, setCurrentField] = useState({
    type: 'text' as FieldType,
    label: '',
    x: 0,
    y: 0,
  });

  const handleAddField = () => {
    if (!currentField.label) return;

    const newField: Field = {
      id: `field_${Date.now()}`,
      type: currentField.type,
      label: currentField.label,
      position: { x: currentField.x, y: currentField.y },
    };

    setFields([...fields, newField]);
    setCurrentField({ type: 'text', label: '', x: 0, y: 0 });
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || fields.length === 0) return;
    onSubmit({ name, fields });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card title="Blueprint Details">
        <Input
          label="Blueprint Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Employment Contract"
          required
        />
      </Card>

      <Card title="Add Fields">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Type
            </label>
            <select
              value={currentField.type}
              onChange={(e) =>
                setCurrentField({ ...currentField, type: e.target.value as FieldType })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">Text</option>
              <option value="date">Date</option>
              <option value="checkbox">Checkbox</option>
              <option value="signature">Signature</option>
            </select>
          </div>
          <Input
            label="Field Label"
            value={currentField.label}
            onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
            placeholder="e.g., Full Name"
          />
          <Input
            label="Position X"
            type="number"
            value={currentField.x}
            onChange={(e) =>
              setCurrentField({ ...currentField, x: parseInt(e.target.value) || 0 })
            }
          />
          <Input
            label="Position Y"
            type="number"
            value={currentField.y}
            onChange={(e) =>
              setCurrentField({ ...currentField, y: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <Button type="button" onClick={handleAddField} variant="secondary" size="sm">
          Add Field
        </Button>
      </Card>

      {fields.length > 0 && (
        <Card title="Fields">
          <div className="space-y-2">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="font-medium">{field.label}</span>
                  <span className="text-sm text-gray-500 ml-2">({field.type})</span>
                  <span className="text-xs text-gray-400 ml-2">
                    Position: {field.position.x}, {field.position.y}
                  </span>
                </div>
                <Button
                  type="button"
                  onClick={() => handleRemoveField(field.id)}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={!name || fields.length === 0}>
          Create Blueprint
        </Button>
      </div>
    </form>
  );
};