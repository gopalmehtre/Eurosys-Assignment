// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Blueprints } from './pages/Blueprints';
import { CreateContract } from './pages/CreateContract';
import { ContractDetails } from './pages/ContractDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blueprints" element={<Blueprints />} />
            <Route path="/contracts/new" element={<CreateContract />} />
            <Route path="/contracts/:id" element={<ContractDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;