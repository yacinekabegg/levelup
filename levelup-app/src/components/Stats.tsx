import React from 'react';
import { useUserStore } from '@/stores/userStore';

const Stats: React.FC = () => {
  const { stats, user } = useUserStore();

  if (!user) return null;

  const statCards = [
    {
      title: 'Défis Complétés',
      value: stats.totalChallengesCompleted,
      icon: '✅',
      color: 'success'
    },
    {
      title: 'Série Actuelle',
      value: user.streak,
      icon: '🔥',
      color: 'warning'
    },
    {
      title: 'Total XP',
      value: user.totalXp,
      icon: '⭐',
      color: 'primary'
    },
    {
      title: 'Badges Débloqués',
      value: user.badges.length,
      icon: '🏆',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return 'bg-success-50 border-success-200 text-success-800';
      case 'warning':
        return 'bg-warning-50 border-warning-200 text-warning-800';
      case 'primary':
        return 'bg-primary-50 border-primary-200 text-primary-800';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Statistiques</h2>
      
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${getColorClasses(stat.color)}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.title}</div>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Badges récents */}
      {user.badges.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🏆 Badges Récents</h3>
          <div className="flex flex-wrap gap-2">
            {user.badges.slice(-3).map((badge) => (
              <div
                key={badge.id}
                className="flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
                title={badge.description}
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-medium text-yellow-800">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progression du niveau */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Progression</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Niveau {user.level}</span>
            <span>Niveau {user.level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            {user.xp} / {user.maxXp} XP ({Math.round((user.xp / user.maxXp) * 100)}%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats; 