# 🚀 LevelUp - Application de Développement Personnel Gamifié

Une application web moderne pour sortir de sa zone de confort et développer ses compétences personnelles avec un système de gamification avancé.

## ✨ Fonctionnalités

### 🎯 Onboarding Personnalisé
- **Sélection de domaines** : 30 domaines de vie disponibles
- **Création d'avatar** : Avatar cartoon évolutif
- **Personnalisation** : 3 à 7 domaines selon vos priorités

### 🎮 Système de Gamification
- **XP et Niveaux** : Progression avec points d'expérience
- **Avatar Évolutif** : Évolution visuelle selon le niveau
- **Badges** : Récompenses pour les accomplissements
- **Séries** : Suivi des défis quotidiens consécutifs

### 📊 Défis Quotidiens
- **Personnalisation** : Défis adaptés à vos domaines sélectionnés
- **Difficultés** : Facile, Moyen, Difficile
- **Récompenses XP** : 15 à 60 XP selon la difficulté
- **Durée estimée** : Temps nécessaire pour chaque défi

### 🎨 Interface Moderne
- **Design Responsive** : Mobile-first design
- **Animations** : Transitions fluides et effets visuels
- **Thème Coloré** : Palette moderne et motivante
- **UX Optimisée** : Navigation intuitive

## 🛠️ Technologies Utilisées

- **React 18** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Styles utilitaires
- **Zustand** - Gestion d'état
- **React Router** - Navigation
- **Framer Motion** - Animations

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/yacinekabegg/levelup.git
cd levelup/levelup-app

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Scripts Disponibles
```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run preview      # Prévisualiser la build
npm run lint         # Linter le code
```

## 📁 Structure du Projet

```
levelup-app/
├── src/
│   ├── components/          # Composants React
│   │   ├── Avatar.tsx      # Affichage de l'avatar
│   │   ├── ChallengeCard.tsx # Carte de défi
│   │   ├── Dashboard.tsx   # Dashboard principal
│   │   ├── Header.tsx      # En-tête de l'application
│   │   ├── Loading.tsx     # Écran de chargement
│   │   ├── Onboarding.tsx  # Processus d'onboarding
│   │   └── Stats.tsx       # Statistiques utilisateur
│   ├── data/               # Données statiques
│   │   ├── challenges.ts   # Base de données des défis
│   │   └── domains.ts      # Domaines de vie
│   ├── stores/             # Gestion d'état
│   │   └── userStore.ts    # Store Zustand
│   ├── types/              # Types TypeScript
│   │   └── index.ts        # Définitions de types
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── public/                 # Assets statiques
├── package.json            # Dépendances
├── vite.config.ts          # Configuration Vite
├── tailwind.config.js      # Configuration Tailwind
└── tsconfig.json           # Configuration TypeScript
```

## 🎯 Domaines de Vie Disponibles

### 🧘 Bien-être
- Méditation, relaxation, santé mentale

### 🌱 Écologie  
- Actions pour l'environnement et le développement durable

### 💪 Sport
- Activité physique, fitness, endurance

### 🗣️ Relations
- Amis, famille, réseaux sociaux

### 💼 Professionnel
- Carrière, compétences, développement professionnel

### 🍎 Alimentation
- Cuisine saine, équilibre alimentaire

### 📚 Apprentissage
- Formation, connaissances, nouvelles compétences

### 🎨 Créativité
- Art, expression, projets créatifs

### 🎯 Organisation
- Productivité, planification, gestion du temps

### 💰 Finances
- Épargne, investissement, gestion budgétaire

### ✨ Spiritualité
- Développement spirituel, philosophie de vie

### 💻 Technologie
- Nouvelles technologies, digital, innovation

### ✈️ Voyage
- Découverte, exploration, nouvelles cultures

### 🎵 Musique
- Pratique musicale, découverte, concerts

### 👨‍🍳 Cuisine
- Recettes, techniques culinaires, gastronomie

### 📸 Photographie
- Art photographique, composition, technique

### 🌿 Jardinage
- Plantes, potager, nature

### 📖 Lecture
- Livres, articles, culture littéraire

### ✍️ Écriture
- Rédaction, storytelling, expression écrite

### 💃 Danse
- Chorégraphie, rythme, expression corporelle

### 🗣️ Langues
- Apprentissage de langues étrangères

### 🤝 Bénévolat
- Actions caritatives, aide aux autres

### 🧠 Pleine conscience
- Présence, conscience, méditation

### 🏋️ Fitness
- Musculation, cardio, forme physique

### 🧘‍♀️ Yoga
- Pratique du yoga, flexibilité, équilibre

### 🕉️ Méditation
- Techniques de méditation, calme intérieur

### 🎭 Art
- Expression artistique, création visuelle

### 🔬 Science
- Découvertes scientifiques, recherche

### 📜 Histoire
- Histoire, culture, patrimoine

### 🤔 Philosophie
- Réflexion philosophique, sagesse

## 🎮 Système de Gamification

### XP et Niveaux
- **Gain d'XP** : 15-60 points par défi selon la difficulté
- **Progression** : Chaque niveau nécessite 20% d'XP en plus
- **Niveaux** : De 1 à 100 avec évolution de l'avatar

### Avatar Évolutif
- **10 étapes d'évolution** : De Débutant à Divin
- **Émojis uniques** : Changement visuel selon le niveau
- **Équipement** : Système d'équipement (v2)
- **Accessoires** : Animations et effets spéciaux

### Badges et Récompenses
- **Badges automatiques** : Accomplissements spéciaux
- **Séries** : Défis quotidiens consécutifs
- **Statistiques** : Suivi détaillé de la progression

## 🔧 Fonctionnalités Techniques

### Gestion d'État
- **Zustand** : Store centralisé pour les données utilisateur
- **Persistance** : Sauvegarde automatique dans localStorage
- **Réactivité** : Mise à jour en temps réel de l'interface

### Base de Données
- **Défis** : 30+ défis par domaine avec métadonnées
- **Domaines** : 30 domaines de vie avec descriptions
- **Personnalisation** : Algorithme de sélection intelligent

### Interface Utilisateur
- **Responsive Design** : Adaptation mobile/desktop
- **Animations** : Transitions fluides avec Framer Motion
- **Accessibilité** : Contrastes optimisés et navigation clavier

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Déploiement sur Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Déploiement sur Netlify
```bash
# Build
npm run build

# Déployer le dossier dist/
```

## 🤝 Contribution

1. **Fork** le projet
2. **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **React** pour l'écosystème moderne
- **Tailwind CSS** pour les styles utilitaires
- **Zustand** pour la gestion d'état simple
- **Vite** pour le build tool rapide
- **Communauté open source** pour l'inspiration

---

**Développé avec ❤️ pour aider à sortir de sa zone de confort !**

## 🎯 Roadmap

### Version 1.1 (Prochainement)
- [ ] Notifications push
- [ ] Mode sombre
- [ ] Export des données
- [ ] Partage sur réseaux sociaux

### Version 1.2
- [ ] Système d'équipement pour avatar
- [ ] Missions hebdomadaires
- [ ] Chat communautaire
- [ ] IA pour défis personnalisés

### Version 2.0
- [ ] Application mobile (React Native)
- [ ] Synchronisation cloud
- [ ] Mode multijoueur
- [ ] Marketplace d'objets cosmétiques 