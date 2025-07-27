import React from 'react';
import { useUserStore } from '@/stores/userStore';

const Avatar: React.FC = () => {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <div className="card text-center">
      <div className="avatar-container">
        <div className="text-8xl animate-float mb-4">{user.avatar.emoji}</div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {user.avatar.name}
      </h3>
      
      <div className="text-sm text-gray-600 mb-4">
        Niveau {user.level}
      </div>
      
      {/* Barre de progression XP */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{user.xp} XP</span>
          <span>{user.maxXp} XP</span>
        </div>
        <div className="xp-bar">
          <div 
            className="xp-progress"
            style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Équipement */}
      {user.avatar.equipment.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Équipement</h4>
          <div className="flex justify-center space-x-2">
            {user.avatar.equipment.map((item) => (
              <div
                key={item.id}
                className="text-2xl"
                title={`${item.name} (+${item.bonus})`}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Accessoires */}
      {user.avatar.accessories.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Accessoires</h4>
          <div className="flex justify-center space-x-2">
            {user.avatar.accessories.map((accessory) => (
              <div
                key={accessory.id}
                className="text-2xl"
                title={accessory.name}
              >
                {accessory.icon}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar; 