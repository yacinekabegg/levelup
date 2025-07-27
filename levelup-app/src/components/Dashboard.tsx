import React from 'react';
import { useUserStore } from '@/stores/userStore';
import ChallengeCard from './ChallengeCard';
import Avatar from './Avatar';
import Stats from './Stats';

const Dashboard: React.FC = () => {
  const { user, dailyChallenges, generateDailyChallenges } = useUserStore();

  if (!user) return null;

  // Générer de nouveaux défis si aucun n'existe
  React.useEffect(() => {
    if (dailyChallenges.length === 0) {
      generateDailyChallenges();
    }
  }, [dailyChallenges.length, generateDailyChallenges]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Avatar et Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <Avatar />
        </div>
        <div className="lg:col-span-2">
          <Stats />
        </div>
      </div>

      {/* Section Défis Quotidiens */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🎯 Défis du Jour</h2>
          <button
            onClick={generateDailyChallenges}
            className="btn-secondary text-sm"
          >
            🔄 Nouveaux défis
          </button>
        </div>

        {dailyChallenges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-gray-600 mb-4">Aucun défi disponible</p>
            <button
              onClick={generateDailyChallenges}
              className="btn-primary"
            >
              Générer des défis
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyChallenges.map((dailyChallenge) => (
              <ChallengeCard
                key={dailyChallenge.id}
                dailyChallenge={dailyChallenge}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section Domaines Sélectionnés */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🏷️ Vos Domaines</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {user.selectedDomains.map((domainId) => {
            // Ici vous pourriez récupérer les informations du domaine
            return (
              <div
                key={domainId}
                className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-center"
              >
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-sm font-medium text-primary-800">
                  {domainId}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 