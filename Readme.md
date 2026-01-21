# Contract Management Platform

A full-stack Contract Management Platform built with React, TypeScript, Node.js, and MongoDB that demonstrates blueprint creation, contract lifecycle management, and clean architecture.

## Deployed Links
- Frontend : https://eurosys-assignment-o7gj.vercel.app/
- Backend : https://eurosys-assignment.onrender.com

## 🚀 Features

- **Blueprint Builder**: Create reusable contract templates with configurable fields (Text, Date, Signature, Checkbox)
- **Contract Creation**: Generate contracts from blueprints with field value filling
- **Contract Lifecycle**: Controlled state transitions (Created → Approved → Sent → Signed → Locked / Revoked)
- **Dashboard**: Filterable contract listing with status-based grouping
- **Full-Stack Architecture**: Express backend with MongoDB persistence

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Zustand for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Zod for validation
- CORS enabled

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🏃‍♂️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd contract-management-platform
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/contract-management
PORT=8000" > .env

# Start the server
npm run dev
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🏗 Architecture Decisions

### Frontend Architecture
- **Component-based design**: Separated UI components, forms, and pages for reusability
- **Centralized state management**: Zustand for global state (blueprints, contracts)
- **Service layer**: API calls abstracted into service modules
- **Type safety**: Comprehensive TypeScript types for all entities
- **Lifecycle enforcement**: Status machine utility for valid state transitions

### Backend Architecture
- **MVC pattern**: Routes → Controllers → Services for separation of concerns
- **Business logic in services**: Contract lifecycle rules enforced server-side
- **Schema validation**: Zod schemas for request validation
- **MongoDB models**: Mongoose for data persistence and relationships
- **RESTful API**: Clear, semantic endpoint design

### Why This Stack?
- **React + TypeScript**: Industry standard for type-safe frontend development
- **Zustand**: Lightweight state management, simpler than Redux for this scale
- **MongoDB**: Flexible schema for blueprint fields and contract values
- **Express**: Minimal, fast backend framework
- **Separation of concerns**: Frontend/backend split demonstrates full-stack thinking

## 📊 Data Models

### Blueprint
```typescript
{
  id: string
  name: string
  fields: Field[]
  createdAt: Date
}
```

### Field
```typescript
{
  id: string
  type: 'text' | 'date' | 'checkbox' | 'signature'
  label: string
  position: { x: number, y: number }
}
```

### Contract
```typescript
{
  id: string
  name: string
  blueprintId: string
  status: 'created' | 'approved' | 'sent' | 'signed' | 'locked' | 'revoked'
  values: Record<string, any>
  createdAt: Date
}
```

## 🔄 Contract Lifecycle

```
Created → Approved → Sent → Signed → Locked
    ↓                    ↓
  Revoked           Revoked
```

**Rules**:
- No skipping states (enforced both frontend and backend)
- Locked contracts cannot be edited
- Revoked contracts are terminal states
- Status changes validated on server

## 🎨 Features Implementation

### Blueprint Creation
1. Navigate to "Blueprints" page
2. Enter blueprint name
3. Add fields with type, label, and position
4. Save blueprint to database

### Contract Creation
1. Navigate to "Create Contract" page
2. Select a blueprint from dropdown
3. Fill in values for all fields
4. Submit to create contract with "Created" status

### Contract Management
1. View all contracts in Dashboard
2. Filter by status (Active, Pending, Signed)
3. Click contract to view details
4. Change status using action buttons (validated transitions only)
5. Locked contracts show read-only view

## 🔒 Business Rules Enforced

- Status transitions follow strict lifecycle
- Locked contracts are immutable
- Revoked contracts cannot progress
- All state changes validated server-side
- Invalid transitions return 400 errors

## 📝 Assumptions

1. **No Authentication**: Single user system for MVP
2. **Simple Positioning**: Fields positioned with basic x,y coordinates (no drag-drop)
3. **No Versioning**: Contracts don't track historical changes
4. **Blueprint Immutability**: Changing blueprint doesn't affect existing contracts
5. **In-memory Contract-Blueprint Link**: Contracts reference blueprints by ID only

## 🚀 Future Improvements

- [ ] Drag-and-drop field positioning
- [ ] Real signature capture
- [ ] Email integration for "Sent" status
- [ ] User authentication and multi-tenancy
- [ ] Contract versioning and history
- [ ] Advanced search and filtering
- [ ] Export contracts to PDF
- [ ] Audit logs for compliance
- [ ] Real-time collaboration
- [ ] Notification system

## 🧪 Testing

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
npm run test
```

## 👤 Author

Gopal Mehtre.

---

Built as part of a technical assignment demonstrating full-stack development, product thinking, and clean architecture.
- NOTE : I sincerely apologize for the misspelling of the Company name I did'nt mean to. It was a silly mistake and I it will not be repeated again. I hope this does'nt affect my application.
