import React from 'react';
import { useUserStore } from '@/stores/userStore';
import { DailyChallenge } from '@/types';

interface ChallengeCardProps {
  dailyChallenge: DailyChallenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ dailyChallenge }) => {
  const { startChallenge, completeChallenge, failChallenge } = useUserStore();
  const { challenge, status } = dailyChallenge;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success-100 text-success-800';
      case 'medium':
        return 'bg-warning-100 text-warning-800';
      case 'hard':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'hard':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '⭕';
    }
  };

  const handleStart = () => {
    startChallenge(challenge.id);
  };

  const handleComplete = () => {
    completeChallenge(challenge.id);
  };

  const handleFail = () => {
    failChallenge(challenge.id);
  };

  return (
    <div className="challenge-card">
      {/* En-tête du défi */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{challenge.title}</h3>
          <p className="text-sm text-gray-600">{challenge.description}</p>
        </div>
        <div className="text-2xl ml-2">{getStatusIcon(status)}</div>
      </div>

      {/* Métadonnées du défi */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`badge ${getDifficultyColor(challenge.difficulty)}`}>
            {getDifficultyIcon(challenge.difficulty)} {challenge.difficulty}
          </span>
          <span className="badge badge-primary">
            ⏱️ {challenge.duration} min
          </span>
        </div>
        <div className="text-right">
          <div className="font-semibold text-primary-600">{challenge.xpReward} XP</div>
        </div>
      </div>

      {/* Tags */}
      {challenge.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {challenge.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {status === 'pending' && (
          <>
            <button
              onClick={handleStart}
              className="flex-1 btn-primary text-sm py-2"
            >
              Commencer
            </button>
            <button
              onClick={handleFail}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Passer
            </button>
          </>
        )}
        
        {status === 'in-progress' && (
          <>
            <button
              onClick={handleComplete}
              className="flex-1 bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Terminer
            </button>
            <button
              onClick={handleFail}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Échouer
            </button>
          </>
        )}
        
        {status === 'completed' && (
          <div className="w-full text-center text-success-600 font-semibold">
            Défi accompli ! +{challenge.xpReward} XP
          </div>
        )}
        
        {status === 'failed' && (
          <div className="w-full text-center text-gray-500">
            Défi échoué
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard; 