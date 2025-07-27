import { Challenge } from '@/types';

export const challenges: Challenge[] = [
  // 🧘 Bien-être
  {
    id: 'wellness-001',
    title: 'Méditation matinale de 10 minutes',
    description: 'Commencez votre journée par 10 minutes de méditation guidée',
    domain: 'wellness',
    difficulty: 'easy',
    duration: 10,
    xpReward: 15,
    tags: ['méditation', 'matin', 'zen'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'wellness-002',
    title: 'Séance de yoga de 20 minutes',
    description: 'Pratiquez une séance de yoga pour vous détendre',
    domain: 'wellness',
    difficulty: 'medium',
    duration: 20,
    xpReward: 25,
    tags: ['yoga', 'détente', 'flexibilité'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'wellness-003',
    title: 'Bain relaxant avec musique',
    description: 'Prenez un bain chaud avec de la musique apaisante',
    domain: 'wellness',
    difficulty: 'easy',
    duration: 30,
    xpReward: 20,
    tags: ['détente', 'bain', 'musique'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 🌱 Écologie
  {
    id: 'ecology-001',
    title: 'Remplacer un produit jetable par un réutilisable',
    description: 'Identifiez et remplacez un objet jetable par sa version réutilisable',
    domain: 'ecology',
    difficulty: 'easy',
    duration: 15,
    xpReward: 20,
    tags: ['zéro déchet', 'réutilisable', 'écologie'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'ecology-002',
    title: 'Cuisiner un repas 100% local',
    description: 'Préparez un repas en utilisant uniquement des ingrédients locaux',
    domain: 'ecology',
    difficulty: 'medium',
    duration: 60,
    xpReward: 35,
    tags: ['local', 'cuisine', 'écologie'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'ecology-003',
    title: 'Faire du compostage',
    description: 'Démarrez un système de compostage pour vos déchets organiques',
    domain: 'ecology',
    difficulty: 'hard',
    duration: 45,
    xpReward: 50,
    tags: ['compostage', 'déchets', 'écologie'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 💪 Sport
  {
    id: 'sport-001',
    title: 'Séance de cardio de 20 minutes',
    description: 'Faites 20 minutes d\'exercice cardio (course, vélo, etc.)',
    domain: 'sport',
    difficulty: 'medium',
    duration: 20,
    xpReward: 30,
    tags: ['cardio', 'endurance', 'sport'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sport-002',
    title: 'Séance de musculation',
    description: 'Faites une séance de musculation de 30 minutes',
    domain: 'sport',
    difficulty: 'medium',
    duration: 30,
    xpReward: 35,
    tags: ['musculation', 'force', 'sport'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sport-003',
    title: 'Essayer un nouveau sport',
    description: 'Testez un sport que vous n\'avez jamais pratiqué',
    domain: 'sport',
    difficulty: 'hard',
    duration: 60,
    xpReward: 50,
    tags: ['nouveau sport', 'découverte', 'sport'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 🗣️ Relations
  {
    id: 'social-001',
    title: 'Appeler un ami que vous n\'avez pas vu depuis longtemps',
    description: 'Prenez des nouvelles d\'un ami que vous n\'avez pas contacté récemment',
    domain: 'social',
    difficulty: 'easy',
    duration: 15,
    xpReward: 20,
    tags: ['amitié', 'contact', 'social'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'social-002',
    title: 'Organiser une sortie avec des amis',
    description: 'Proposez et organisez une activité avec vos amis',
    domain: 'social',
    difficulty: 'medium',
    duration: 120,
    xpReward: 40,
    tags: ['organisation', 'sortie', 'social'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'social-003',
    title: 'Participer à un événement communautaire',
    description: 'Rejoignez un événement local ou associatif',
    domain: 'social',
    difficulty: 'hard',
    duration: 180,
    xpReward: 60,
    tags: ['communauté', 'événement', 'social'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 💼 Professionnel
  {
    id: 'professional-001',
    title: 'Apprendre une nouvelle compétence professionnelle',
    description: 'Dédiez 30 minutes à l\'apprentissage d\'une nouvelle compétence',
    domain: 'professional',
    difficulty: 'medium',
    duration: 30,
    xpReward: 25,
    tags: ['apprentissage', 'compétence', 'professionnel'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'professional-002',
    title: 'Networking professionnel',
    description: 'Contactez un professionnel de votre domaine pour échanger',
    domain: 'professional',
    difficulty: 'medium',
    duration: 45,
    xpReward: 35,
    tags: ['networking', 'professionnel', 'contact'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'professional-003',
    title: 'Créer un projet personnel',
    description: 'Démarrez un projet personnel lié à vos compétences',
    domain: 'professional',
    difficulty: 'hard',
    duration: 120,
    xpReward: 50,
    tags: ['projet', 'création', 'professionnel'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 🍎 Alimentation
  {
    id: 'nutrition-001',
    title: 'Cuisiner un repas équilibré',
    description: 'Préparez un repas complet avec protéines, légumes et féculents',
    domain: 'nutrition',
    difficulty: 'medium',
    duration: 45,
    xpReward: 30,
    tags: ['cuisine', 'équilibre', 'nutrition'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'nutrition-002',
    title: 'Découvrir un nouvel aliment',
    description: 'Goûtez un aliment que vous n\'avez jamais essayé',
    domain: 'nutrition',
    difficulty: 'easy',
    duration: 10,
    xpReward: 15,
    tags: ['découverte', 'goût', 'nutrition'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'nutrition-003',
    title: 'Planifier ses repas de la semaine',
    description: 'Créez un plan de repas équilibré pour toute la semaine',
    domain: 'nutrition',
    difficulty: 'hard',
    duration: 60,
    xpReward: 40,
    tags: ['planification', 'organisation', 'nutrition'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 📚 Apprentissage
  {
    id: 'learning-001',
    title: 'Lire 20 pages d\'un livre',
    description: 'Dédiez du temps à la lecture d\'un livre enrichissant',
    domain: 'learning',
    difficulty: 'easy',
    duration: 30,
    xpReward: 20,
    tags: ['lecture', 'apprentissage', 'connaissance'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'learning-002',
    title: 'Suivre un cours en ligne',
    description: 'Commencez ou continuez un cours en ligne sur un sujet qui vous intéresse',
    domain: 'learning',
    difficulty: 'medium',
    duration: 45,
    xpReward: 30,
    tags: ['cours', 'en ligne', 'apprentissage'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'learning-003',
    title: 'Apprendre une nouvelle langue',
    description: 'Pratiquez une langue étrangère pendant 30 minutes',
    domain: 'learning',
    difficulty: 'medium',
    duration: 30,
    xpReward: 35,
    tags: ['langue', 'pratique', 'apprentissage'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 🎨 Créativité
  {
    id: 'creativity-001',
    title: 'Dessiner ou peindre pendant 30 minutes',
    description: 'Exprimez votre créativité à travers le dessin ou la peinture',
    domain: 'creativity',
    difficulty: 'easy',
    duration: 30,
    xpReward: 25,
    tags: ['art', 'créativité', 'expression'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'creativity-002',
    title: 'Écrire une histoire courte',
    description: 'Créez une histoire de 500 mots maximum',
    domain: 'creativity',
    difficulty: 'medium',
    duration: 45,
    xpReward: 35,
    tags: ['écriture', 'histoire', 'créativité'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'creativity-003',
    title: 'Créer un projet DIY',
    description: 'Réalisez un projet de bricolage ou de création manuelle',
    domain: 'creativity',
    difficulty: 'hard',
    duration: 90,
    xpReward: 50,
    tags: ['DIY', 'bricolage', 'créativité'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },

  // 🎯 Organisation
  {
    id: 'organization-001',
    title: 'Ranger une pièce de votre maison',
    description: 'Désencombrez et organisez une pièce de votre logement',
    domain: 'organization',
    difficulty: 'medium',
    duration: 60,
    xpReward: 30,
    tags: ['rangement', 'organisation', 'maison'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'organization-002',
    title: 'Planifier sa semaine',
    description: 'Créez un planning détaillé pour la semaine à venir',
    domain: 'organization',
    difficulty: 'medium',
    duration: 30,
    xpReward: 25,
    tags: ['planification', 'organisation', 'planning'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'organization-003',
    title: 'Mettre en place un système de productivité',
    description: 'Implémentez une méthode d\'organisation (GTD, Pomodoro, etc.)',
    domain: 'organization',
    difficulty: 'hard',
    duration: 120,
    xpReward: 45,
    tags: ['productivité', 'méthode', 'organisation'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Fonction pour obtenir les défis par domaine
export const getChallengesByDomain = (domain: string): Challenge[] => {
  return challenges.filter(challenge => challenge.domain === domain);
};

// Fonction pour obtenir un défi aléatoire par domaine
export const getRandomChallengeByDomain = (domain: string): Challenge | null => {
  const domainChallenges = getChallengesByDomain(domain);
  if (domainChallenges.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * domainChallenges.length);
  return domainChallenges[randomIndex];
};

// Fonction pour obtenir des défis quotidiens personnalisés
export const getDailyChallenges = (selectedDomains: string[], count: number = 3): Challenge[] => {
  const availableChallenges: Challenge[] = [];
  
  selectedDomains.forEach(domain => {
    const domainChallenges = getChallengesByDomain(domain);
    availableChallenges.push(...domainChallenges);
  });
  
  // Mélanger les défis
  const shuffled = availableChallenges.sort(() => 0.5 - Math.random());
  
  // Retourner le nombre demandé de défis
  return shuffled.slice(0, count);
}; 