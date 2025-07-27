// LevelUp Application - Version Corrigée
console.log('LevelUp Application - Version Corrigée chargée');

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé - Initialisation de LevelUp');
    
    // Variables globales
    let userData = {
        level: 3,
        xp: 120,
        maxXp: 200,
        totalXp: 120,
        completedChallenges: [],
        monthlyGoals: ['Gagner en confiance', 'Être plus actif physiquement'],
        lastChallengeDate: null,
        rerollsUsed: 0,
        lastRerollDate: null,
        weeklyObjectives: [],
        monthlyAssessment: null,
        lastAssessmentDate: null,
        levelHistory: [
            { level: 1, date: '2024-01-01', xp: 50 },
            { level: 2, date: '2024-01-15', xp: 100 },
            { level: 3, date: '2024-02-01', xp: 120 }
        ]
    };

    // Charger les données depuis localStorage
    function loadUserData() {
        const saved = localStorage.getItem('levelup_user_data');
        if (saved) {
            try {
                userData = { ...userData, ...JSON.parse(saved) };
                console.log('Données utilisateur chargées depuis localStorage');
            } catch (e) {
                console.error('Erreur lors du chargement des données:', e);
            }
        }
    }

    // Sauvegarder les données
    function saveUserData() {
        try {
            localStorage.setItem('levelup_user_data', JSON.stringify(userData));
            console.log('Données utilisateur sauvegardées');
        } catch (e) {
            console.error('Erreur lors de la sauvegarde:', e);
        }
    }

    // Mettre à jour l'interface
    function updateUI() {
        console.log('Mise à jour de l\'interface');
        
        // Mettre à jour le niveau et XP
        const levelElement = document.getElementById('currentLevel');
        const xpElement = document.getElementById('currentXP');
        const maxXpElement = document.getElementById('maxXP');
        const xpBarElement = document.getElementById('xpBar');
        
        if (levelElement) levelElement.textContent = userData.level;
        if (xpElement) xpElement.textContent = userData.xp;
        if (maxXpElement) maxXpElement.textContent = userData.maxXp;
        
        if (xpBarElement) {
            const xpPercentage = (userData.xp / userData.maxXp) * 100;
            xpBarElement.style.width = `${xpPercentage}%`;
        }
        
        // Mettre à jour les rerolls
        const rerollsElement = document.getElementById('rerollsLeft');
        if (rerollsElement) {
            const rerollsLeft = Math.max(0, 1 - userData.rerollsUsed);
            rerollsElement.innerHTML = `Rerolls restants aujourd'hui: <span class="font-semibold">${rerollsLeft}</span>`;
        }
    }

    // Compléter un défi
    function completeChallenge() {
        console.log('Défi complété');
        userData.xp += 30; // XP gagné
        userData.totalXp += 30;
        
        // Vérifier si niveau up
        if (userData.xp >= userData.maxXp) {
            userData.level++;
            userData.xp = userData.xp - userData.maxXp;
            userData.maxXp = Math.floor(userData.maxXp * 1.2);
            
            // Ajouter à l'historique
            userData.levelHistory.push({
                level: userData.level,
                date: new Date().toISOString().split('T')[0],
                xp: userData.totalXp
            });
        }
        
        saveUserData();
        updateUI();
        
        // Notification
        showNotification('Défi complété ! +30 XP 🎉', 'success');
    }

    // Changer de défi
    function changeChallenge() {
        console.log('Changement de défi');
        
        const today = new Date().toDateString();
        if (userData.lastRerollDate !== today) {
            userData.rerollsUsed = 0;
            userData.lastRerollDate = today;
        }
        
        if (userData.rerollsUsed >= 1) {
            showNotification('Vous avez déjà utilisé votre reroll aujourd\'hui !', 'error');
            return;
        }
        
        userData.rerollsUsed++;
        saveUserData();
        updateUI();
        
        // Changer le défi (simulation)
        const challengeText = document.getElementById('challengeText');
        const challengeCategory = document.getElementById('challengeCategory');
        
        if (challengeText && challengeCategory) {
            const newChallenges = [
                { text: "Fais 30 minutes d'exercice physique", category: "Santé" },
                { text: "Lis un chapitre d'un livre", category: "Apprentissage" },
                { text: "Complimente sincèrement 3 personnes", category: "Social" },
                { text: "Essaie une nouvelle recette de cuisine", category: "Créativité" },
                { text: "Organise ton espace de travail", category: "Organisation" }
            ];
            
            const randomChallenge = newChallenges[Math.floor(Math.random() * newChallenges.length)];
            challengeText.textContent = randomChallenge.text;
            challengeCategory.textContent = randomChallenge.category;
        }
        
        showNotification('Nouveau défi généré ! 🔄', 'success');
    }

    // Afficher une notification
    function showNotification(message, type = 'info') {
        console.log('Notification:', message, type);
        
        // Créer une notification simple
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Afficher l'évaluation mensuelle
    function showMonthlyAssessment() {
        console.log('Affichage de l\'évaluation mensuelle');
        alert('Fonctionnalité d\'évaluation mensuelle - En cours de développement');
    }

    // Ajouter un objectif hebdomadaire
    function addWeeklyObjective() {
        console.log('Ajout d\'objectif hebdomadaire');
        alert('Fonctionnalité d\'ajout d\'objectif - En cours de développement');
    }

    // Afficher l'historique des niveaux
    function showLevelHistory() {
        console.log('Affichage de l\'historique des niveaux');
        alert('Historique des niveaux - En cours de développement');
    }

    // Afficher le modal de partage
    function showShareModal() {
        console.log('Affichage du modal de partage');
        alert('Partage de progression - En cours de développement');
    }

    // Initialiser les événements
    function initEvents() {
        console.log('Initialisation des événements');
        
        // Bouton compléter défi
        const completeButton = document.getElementById('completeChallenge');
        if (completeButton) {
            completeButton.addEventListener('click', completeChallenge);
            console.log('✅ Event listener ajouté sur completeChallenge');
        } else {
            console.error('❌ Bouton completeChallenge non trouvé');
        }
        
        // Bouton changer défi
        const changeButton = document.getElementById('changeChallenge');
        if (changeButton) {
            changeButton.addEventListener('click', changeChallenge);
            console.log('✅ Event listener ajouté sur changeChallenge');
        } else {
            console.error('❌ Bouton changeChallenge non trouvé');
        }
        
        // Bouton évaluation mensuelle
        const assessmentButton = document.getElementById('monthlyAssessment');
        if (assessmentButton) {
            assessmentButton.addEventListener('click', showMonthlyAssessment);
            console.log('✅ Event listener ajouté sur monthlyAssessment');
        } else {
            console.error('❌ Bouton monthlyAssessment non trouvé');
        }
        
        // Bouton ajouter objectif hebdomadaire
        const addObjectiveButton = document.getElementById('addWeeklyObjective');
        if (addObjectiveButton) {
            addObjectiveButton.addEventListener('click', addWeeklyObjective);
            console.log('✅ Event listener ajouté sur addWeeklyObjective');
        } else {
            console.error('❌ Bouton addWeeklyObjective non trouvé');
        }
        
        // Bouton voir niveaux
        const viewLevelsButton = document.getElementById('viewLevels');
        if (viewLevelsButton) {
            viewLevelsButton.addEventListener('click', showLevelHistory);
            console.log('✅ Event listener ajouté sur viewLevels');
        } else {
            console.error('❌ Bouton viewLevels non trouvé');
        }
        
        // Bouton partager progression
        const shareButton = document.getElementById('shareProgress');
        if (shareButton) {
            shareButton.addEventListener('click', showShareModal);
            console.log('✅ Event listener ajouté sur shareProgress');
        } else {
            console.error('❌ Bouton shareProgress non trouvé');
        }
    }

    // Initialisation complète
    function init() {
        console.log('Début de l\'initialisation');
        loadUserData();
        updateUI();
        initEvents();
        console.log('Initialisation terminée');
    }

    // Démarrer l'application
    init();
}); 