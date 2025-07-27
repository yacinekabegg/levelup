import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce-slow">🚀</div>
        <h1 className="text-3xl font-bold text-gradient mb-2">LevelUp</h1>
        <p className="text-gray-600 mb-8">Chargement de votre aventure...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading; 