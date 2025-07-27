import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { getAllDomains } from '@/data/domains';
import { LifeDomain } from '@/types';

const Onboarding: React.FC = () => {
  const { initializeUser } = useUserStore();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [error, setError] = useState('');

  const domains = getAllDomains();

  const handleDomainToggle = (domainId: string) => {
    setSelectedDomains(prev => {
      if (prev.includes(domainId)) {
        return prev.filter(id => id !== domainId);
      } else {
        return [...prev, domainId];
      }
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!username.trim()) {
        setError('Veuillez saisir votre nom d\'utilisateur');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (selectedDomains.length < 3) {
        setError('Veuillez sélectionner au moins 3 domaines');
        return;
      }
      if (selectedDomains.length > 7) {
        setError('Veuillez sélectionner maximum 7 domaines');
        return;
      }
      setError('');
      setStep(3);
    }
  };

  const handleFinish = () => {
    if (!email.trim()) {
      setError('Veuillez saisir votre email');
      return;
    }
    setError('');
    initializeUser(username, email, selectedDomains);
  };

  const getDomainColor = (domain: LifeDomain) => {
    const colors: { [key: string]: string } = {
      purple: 'border-purple-300 bg-purple-50',
      green: 'border-green-300 bg-green-50',
      blue: 'border-blue-300 bg-blue-50',
      pink: 'border-pink-300 bg-pink-50',
      indigo: 'border-indigo-300 bg-indigo-50',
      orange: 'border-orange-300 bg-orange-50',
      yellow: 'border-yellow-300 bg-yellow-50',
      red: 'border-red-300 bg-red-50',
      gray: 'border-gray-300 bg-gray-50',
      emerald: 'border-emerald-300 bg-emerald-50',
      violet: 'border-violet-300 bg-violet-50',
      cyan: 'border-cyan-300 bg-cyan-50',
      teal: 'border-teal-300 bg-teal-50',
      rose: 'border-rose-300 bg-rose-50',
      amber: 'border-amber-300 bg-amber-50',
      slate: 'border-slate-300 bg-slate-50',
      lime: 'border-lime-300 bg-lime-50',
      stone: 'border-stone-300 bg-stone-50',
      zinc: 'border-zinc-300 bg-zinc-50',
      fuchsia: 'border-fuchsia-300 bg-fuchsia-50',
      sky: 'border-sky-300 bg-sky-50'
    };
    return colors[domain.color] || 'border-gray-300 bg-gray-50';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 p-4">
      <div className="max-w-2xl w-full">
        <div className="card">
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce-slow">🚀</div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Bienvenue sur LevelUp</h1>
            <p className="text-gray-600">Votre aventure de développement personnel commence ici !</p>
          </div>

          {/* Indicateur de progression */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-3 h-3 rounded-full ${
                    stepNumber <= step ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Étape 1: Informations utilisateur */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                Commençons par vous connaître
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Sélection des domaines */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                Choisissez vos domaines de vie
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Sélectionnez 3 à 7 domaines qui vous intéressent le plus
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {domains.map((domain) => (
                  <div
                    key={domain.id}
                    onClick={() => handleDomainToggle(domain.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedDomains.includes(domain.id)
                        ? 'border-primary-500 bg-primary-50'
                        : getDomainColor(domain)
                    } hover:scale-105`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{domain.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{domain.name}</h3>
                        <p className="text-sm text-gray-600">{domain.description}</p>
                      </div>
                      {selectedDomains.includes(domain.id) && (
                        <div className="text-primary-500 text-xl">✓</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center text-sm text-gray-600">
                {selectedDomains.length} domaines sélectionnés
              </div>
            </div>
          )}

          {/* Étape 3: Email */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                Dernière étape
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optionnel)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Pour recevoir vos défis quotidiens et suivre votre progression
                  </p>
                </div>

                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-800 mb-2">Récapitulatif</h3>
                  <p className="text-sm text-primary-700">
                    <strong>Nom:</strong> {username}<br />
                    <strong>Domaines sélectionnés:</strong> {selectedDomains.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {error && (
            <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Boutons de navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                Précédent
              </button>
            )}
            
            <div className="flex-1"></div>
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="btn-primary"
              >
                Commencer l'aventure !
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 