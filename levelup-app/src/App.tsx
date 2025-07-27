import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

function App() {
  const { isOnboarded, user } = useUserStore();

  // Écran de chargement pendant l'initialisation
  if (!isOnboarded && !user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50">
      {isOnboarded && user && <Header />}
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/" 
            element={isOnboarded ? <Dashboard /> : <Onboarding />} 
          />
          <Route 
            path="/onboarding" 
            element={<Onboarding />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App; 