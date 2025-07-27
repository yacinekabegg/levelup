import React from 'react';
import { useUserStore } from '@/stores/userStore';

const Header: React.FC = () => {
  const { user } = useUserStore();

  if (!user) return null;

  const xpPercentage = (user.xp / user.maxXp) * 100;

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gradient">🚀 LevelUp</h1>
          </div>

          {/* Informations utilisateur */}
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-float">{user.avatar.emoji}</div>
              <div className="text-right">
                <div className="font-semibold text-gray-800">{user.username}</div>
                <div className="text-sm text-gray-600">Niveau {user.level}</div>
              </div>
            </div>

            {/* Barre XP */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-gray-700">
                  {user.xp} / {user.maxXp} XP
                </div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-success-600">{user.streak}</div>
                <div className="text-gray-600">Jours</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-primary-600">{user.badges.length}</div>
                <div className="text-gray-600">Badges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 