import { LifeDomain } from '@/types';

export const lifeDomains: LifeDomain[] = [
  {
    id: 'wellness',
    name: 'Bien-être',
    icon: '🧘',
    color: 'purple',
    description: 'Méditation, relaxation, santé mentale',
    priority: 1
  },
  {
    id: 'ecology',
    name: 'Écologie',
    icon: '🌱',
    color: 'green',
    description: 'Actions pour l\'environnement et le développement durable',
    priority: 2
  },
  {
    id: 'sport',
    name: 'Sport',
    icon: '💪',
    color: 'blue',
    description: 'Activité physique, fitness, endurance',
    priority: 3
  },
  {
    id: 'social',
    name: 'Relations',
    icon: '🗣️',
    color: 'pink',
    description: 'Amis, famille, réseaux sociaux',
    priority: 4
  },
  {
    id: 'professional',
    name: 'Professionnel',
    icon: '💼',
    color: 'indigo',
    description: 'Carrière, compétences, développement professionnel',
    priority: 5
  },
  {
    id: 'nutrition',
    name: 'Alimentation',
    icon: '🍎',
    color: 'orange',
    description: 'Cuisine saine, équilibre alimentaire',
    priority: 6
  },
  {
    id: 'learning',
    name: 'Apprentissage',
    icon: '📚',
    color: 'yellow',
    description: 'Formation, connaissances, nouvelles compétences',
    priority: 7
  },
  {
    id: 'creativity',
    name: 'Créativité',
    icon: '🎨',
    color: 'red',
    description: 'Art, expression, projets créatifs',
    priority: 8
  },
  {
    id: 'organization',
    name: 'Organisation',
    icon: '🎯',
    color: 'gray',
    description: 'Productivité, planification, gestion du temps',
    priority: 9
  },
  {
    id: 'finance',
    name: 'Finances',
    icon: '💰',
    color: 'emerald',
    description: 'Épargne, investissement, gestion budgétaire',
    priority: 10
  },
  {
    id: 'spirituality',
    name: 'Spiritualité',
    icon: '✨',
    color: 'violet',
    description: 'Développement spirituel, philosophie de vie',
    priority: 11
  },
  {
    id: 'technology',
    name: 'Technologie',
    icon: '💻',
    color: 'cyan',
    description: 'Nouvelles technologies, digital, innovation',
    priority: 12
  },
  {
    id: 'travel',
    name: 'Voyage',
    icon: '✈️',
    color: 'teal',
    description: 'Découverte, exploration, nouvelles cultures',
    priority: 13
  },
  {
    id: 'music',
    name: 'Musique',
    icon: '🎵',
    color: 'rose',
    description: 'Pratique musicale, découverte, concerts',
    priority: 14
  },
  {
    id: 'cooking',
    name: 'Cuisine',
    icon: '👨‍🍳',
    color: 'amber',
    description: 'Recettes, techniques culinaires, gastronomie',
    priority: 15
  },
  {
    id: 'photography',
    name: 'Photographie',
    icon: '📸',
    color: 'slate',
    description: 'Art photographique, composition, technique',
    priority: 16
  },
  {
    id: 'gardening',
    name: 'Jardinage',
    icon: '🌿',
    color: 'lime',
    description: 'Plantes, potager, nature',
    priority: 17
  },
  {
    id: 'reading',
    name: 'Lecture',
    icon: '📖',
    color: 'stone',
    description: 'Livres, articles, culture littéraire',
    priority: 18
  },
  {
    id: 'writing',
    name: 'Écriture',
    icon: '✍️',
    color: 'zinc',
    description: 'Rédaction, storytelling, expression écrite',
    priority: 19
  },
  {
    id: 'dance',
    name: 'Danse',
    icon: '💃',
    color: 'fuchsia',
    description: 'Chorégraphie, rythme, expression corporelle',
    priority: 20
  },
  {
    id: 'languages',
    name: 'Langues',
    icon: '🗣️',
    color: 'sky',
    description: 'Apprentissage de langues étrangères',
    priority: 21
  },
  {
    id: 'volunteering',
    name: 'Bénévolat',
    icon: '🤝',
    color: 'emerald',
    description: 'Actions caritatives, aide aux autres',
    priority: 22
  },
  {
    id: 'mindfulness',
    name: 'Pleine conscience',
    icon: '🧠',
    color: 'purple',
    description: 'Présence, conscience, méditation',
    priority: 23
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: '🏋️',
    color: 'red',
    description: 'Musculation, cardio, forme physique',
    priority: 24
  },
  {
    id: 'yoga',
    name: 'Yoga',
    icon: '🧘‍♀️',
    color: 'indigo',
    description: 'Pratique du yoga, flexibilité, équilibre',
    priority: 25
  },
  {
    id: 'meditation',
    name: 'Méditation',
    icon: '🕉️',
    color: 'violet',
    description: 'Techniques de méditation, calme intérieur',
    priority: 26
  },
  {
    id: 'art',
    name: 'Art',
    icon: '🎭',
    color: 'pink',
    description: 'Expression artistique, création visuelle',
    priority: 27
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'blue',
    description: 'Découvertes scientifiques, recherche',
    priority: 28
  },
  {
    id: 'history',
    name: 'Histoire',
    icon: '📜',
    color: 'amber',
    description: 'Histoire, culture, patrimoine',
    priority: 29
  },
  {
    id: 'philosophy',
    name: 'Philosophie',
    icon: '🤔',
    color: 'gray',
    description: 'Réflexion philosophique, sagesse',
    priority: 30
  }
];

// Fonction pour obtenir un domaine par ID
export const getDomainById = (id: string): LifeDomain | undefined => {
  return lifeDomains.find(domain => domain.id === id);
};

// Fonction pour obtenir tous les domaines
export const getAllDomains = (): LifeDomain[] => {
  return lifeDomains;
};

// Fonction pour obtenir les domaines par priorité
export const getDomainsByPriority = (maxPriority: number = 10): LifeDomain[] => {
  return lifeDomains
    .filter(domain => domain.priority <= maxPriority)
    .sort((a, b) => a.priority - b.priority);
}; 