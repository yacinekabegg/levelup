// LevelUp Application - Version Fixée V2
console.log('LevelUp Application - Version Fixée V2 chargée');

// Données utilisateur
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
    const saved = localStorage.getItem('levelup_userdata');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            userData = { ...userData, ...parsed };
            console.log('Données chargées:', userData);
        } catch (e) {
            console.error('Erreur lors du chargement des données:', e);
        }
    }
}

// Sauvegarder les données dans localStorage
function saveUserData() {
    try {
        localStorage.setItem('levelup_userdata', JSON.stringify(userData));
        console.log('Données sauvegardées');
    } catch (e) {
        console.error('Erreur lors de la sauvegarde:', e);
    }
}

// Mettre à jour l'interface utilisateur
function updateUI() {
    console.log('Mise à jour de l\'interface');
    
    // Mettre à jour le niveau et XP
    const levelElement = document.getElementById('currentLevel');
    const xpElement = document.getElementById('currentXp');
    const xpBarElement = document.getElementById('xpBar');
    
    if (levelElement) levelElement.textContent = `Niveau ${userData.level}`;
    if (xpElement) xpElement.textContent = `${userData.xp} / ${userData.maxXp} XP`;
    if (xpBarElement) {
        const percentage = (userData.xp / userData.maxXp) * 100;
        xpBarElement.style.width = `${percentage}%`;
    }
    
    // Mettre à jour le défi du jour
    updateDailyChallenge();
    
    // Mettre à jour les objectifs hebdomadaires
    updateWeeklyObjectives();
    
    // Mettre à jour les objectifs mensuels
    updateMonthlyGoals();
}

// Mettre à jour le défi du jour
function updateDailyChallenge() {
    const challengeTitle = document.getElementById('challengeTitle');
    const challengeCategory = document.getElementById('challengeCategory');
    
    if (challengeTitle && challengeCategory) {
        const challenges = getChallenges();
        const today = new Date().toDateString();
        
        if (userData.lastChallengeDate !== today) {
            userData.lastChallengeDate = today;
            userData.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
            saveUserData();
        }
        
        if (userData.currentChallenge) {
            challengeTitle.textContent = userData.currentChallenge.title;
            challengeCategory.textContent = userData.currentChallenge.category;
        }
    }
}

// Mettre à jour les objectifs hebdomadaires
function updateWeeklyObjectives() {
    console.log('Mise à jour des objectifs hebdomadaires');
    console.log('Objectifs actuels:', userData.weeklyObjectives);
    
    const objectivesContainer = document.getElementById('weeklyObjectives');
    const weekDatesElement = document.getElementById('weekDates');
    
    console.log('Container trouvé:', objectivesContainer);
    console.log('Dates trouvées:', weekDatesElement);
    
    if (!objectivesContainer) {
        console.error('Container weeklyObjectives non trouvé');
        return;
    }
    
    // Calculer les dates de la semaine actuelle
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    if (weekDatesElement) {
        weekDatesElement.textContent = `Semaine du ${startOfWeek.getDate()} ${getMonthName(startOfWeek.getMonth())} au ${endOfWeek.getDate()} ${getMonthName(endOfWeek.getMonth())}`;
    }
    
    objectivesContainer.innerHTML = '';

    if (userData.weeklyObjectives.length === 0) {
        console.log('Aucun objectif, affichage du message vide');
        objectivesContainer.innerHTML = `
            <div class="text-center py-6 text-gray-500">
                <div class="text-3xl mb-2">📅</div>
                <p>Aucun objectif hebdomadaire</p>
                <p class="text-sm">Ajoutez vos objectifs pour la semaine</p>
            </div>
        `;
        return;
    }

    console.log('Affichage de', userData.weeklyObjectives.length, 'objectifs');
    
    userData.weeklyObjectives.forEach((objective, index) => {
        console.log('Affichage objectif:', objective);
        
        const priorityIcons = {
            low: '🟢',
            medium: '🟡',
            high: '🔴'
        };

        const objectiveElement = document.createElement('div');
        objectiveElement.className = `flex items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 ${objective.completed ? 'opacity-60' : ''}`;
        objectiveElement.innerHTML = `
            <div class="flex items-center flex-1">
                <span class="text-lg mr-3">${priorityIcons[objective.priority]}</span>
                <div class="flex-1">
                    <div class="font-medium text-gray-800">${objective.text}</div>
                    <div class="text-sm text-gray-600">${objective.category}</div>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="toggleWeeklyObjective(${index})" class="text-green-600 hover:text-green-800 p-1" title="${objective.completed ? 'Marquer comme non terminé' : 'Marquer comme terminé'}">
                    ${objective.completed ? '✅' : '⭕'}
                </button>
                <button onclick="deleteWeeklyObjective(${index})" class="text-red-600 hover:text-red-800 p-1" title="Supprimer">
                    🗑️
                </button>
            </div>
        `;
        
        objectivesContainer.appendChild(objectiveElement);
    });
    
    console.log('Mise à jour terminée');
}

// Mettre à jour les objectifs mensuels
function updateMonthlyGoals() {
    const goalsContainer = document.getElementById('monthlyGoals');
    if (goalsContainer) {
        goalsContainer.innerHTML = userData.monthlyGoals.map(goal => 
            `<div class="flex items-center p-2 bg-purple-50 rounded-lg mb-2">
                <span class="text-purple-600 mr-2">🎯</span>
                <span class="text-gray-800">${goal}</span>
            </div>`
        ).join('');
    }
}

// Obtenir les défis
function getChallenges() {
    const saved = localStorage.getItem('levelup_challenges');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Erreur lors du chargement des défis:', e);
        }
    }
    
    // Défis par défaut
    return [
        { title: "Appelle un ami que tu n'as pas vu depuis 6 mois", category: "Social", xp: 50 },
        { title: "Essaie un nouveau restaurant", category: "Découverte", xp: 30 },
        { title: "Fais 30 minutes d'exercice", category: "Santé", xp: 40 },
        { title: "Lis un chapitre d'un livre", category: "Apprentissage", xp: 25 },
        { title: "Écris dans un journal", category: "Réflexion", xp: 35 }
    ];
}

// Compléter un défi
function completeChallenge() {
    console.log('Défi complété');
    
    if (userData.currentChallenge) {
        userData.xp += userData.currentChallenge.xp || 30;
        userData.totalXp += userData.currentChallenge.xp || 30;
        userData.completedChallenges.push({
            ...userData.currentChallenge,
            completedAt: new Date().toISOString()
        });
        
        // Vérifier si niveau supérieur
        if (userData.xp >= userData.maxXp) {
            userData.level++;
            userData.xp -= userData.maxXp;
            userData.maxXp = Math.floor(userData.maxXp * 1.2);
            userData.levelHistory.push({
                level: userData.level,
                date: new Date().toISOString().split('T')[0],
                xp: userData.totalXp
            });
        }
        
        saveUserData();
        updateUI();
        showNotification('Défi complété ! +' + (userData.currentChallenge.xp || 30) + ' XP 🎉', 'success');
    }
}

// Changer de défi
function changeChallenge() {
    console.log('Changement de défi');
    
    const today = new Date().toDateString();
    if (userData.lastRerollDate === today && userData.rerollsUsed >= 1) {
        showNotification('Vous avez déjà utilisé votre reroll aujourd\'hui !', 'error');
        return;
    }
    
    if (userData.lastRerollDate !== today) {
        userData.rerollsUsed = 0;
        userData.lastRerollDate = today;
    }
    
    userData.rerollsUsed++;
    const challenges = getChallenges();
    userData.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    saveUserData();
    updateUI();
    showNotification('Nouveau défi ! 🔄', 'info');
}

// Afficher une notification
function showNotification(message, type = 'info') {
    console.log('Notification:', message, type);
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Ajouter un objectif hebdomadaire
function addWeeklyObjective() {
    console.log('Ajout d\'objectif hebdomadaire');
    
    const modal = document.createElement('div');
    modal.id = 'weeklyObjectiveModal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            <h3 class="text-xl font-bold text-gray-800 mb-4">➕ Ajouter un Objectif Hebdomadaire</h3>
            <form id="weeklyObjectiveForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Objectif</label>
                    <input type="text" id="weeklyObjectiveText" placeholder="Ex: Faire 3 séances de sport" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <select id="weeklyObjectiveCategory" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="Santé">💪 Santé</option>
                        <option value="Apprentissage">📚 Apprentissage</option>
                        <option value="Social">🗣️ Social</option>
                        <option value="Créativité">🎨 Créativité</option>
                        <option value="Organisation">📋 Organisation</option>
                        <option value="Bien-être">🧘 Bien-être</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                    <select id="weeklyObjectivePriority" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="low">🟢 Faible</option>
                        <option value="medium" selected>🟡 Moyenne</option>
                        <option value="high">🔴 Élevée</option>
                    </select>
                </div>
            </form>
            <div class="flex space-x-3 mt-6">
                <button id="saveWeeklyObjective" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                    Ajouter
                </button>
                <button id="closeWeeklyObjectiveModal" class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    Annuler
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const saveButton = document.getElementById('saveWeeklyObjective');
    const closeButton = document.getElementById('closeWeeklyObjectiveModal');
    
    saveButton.addEventListener('click', () => {
        const text = document.getElementById('weeklyObjectiveText').value.trim();
        const category = document.getElementById('weeklyObjectiveCategory').value;
        const priority = document.getElementById('weeklyObjectivePriority').value;
        
        console.log('Ajout d\'objectif:', { text, category, priority });
        
        if (!text) {
            showNotification('Veuillez saisir un objectif !', 'error');
            return;
        }
        
        const newObjective = {
            id: Date.now(),
            text: text,
            category: category,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        console.log('Nouvel objectif créé:', newObjective);
        
        userData.weeklyObjectives.push(newObjective);
        console.log('Objectifs après ajout:', userData.weeklyObjectives);
        
        saveUserData();
        console.log('Données sauvegardées');
        
        updateWeeklyObjectives();
        console.log('Interface mise à jour');
        
        document.body.removeChild(modal);
        
        showNotification('Objectif hebdomadaire ajouté ! 📅', 'success');
    });
    
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Basculer un objectif hebdomadaire
function toggleWeeklyObjective(index) {
    console.log('toggleWeeklyObjective appelé avec index:', index);
    
    if (userData.weeklyObjectives[index]) {
        userData.weeklyObjectives[index].completed = !userData.weeklyObjectives[index].completed;
        saveUserData();
        updateWeeklyObjectives();
        showNotification(
            userData.weeklyObjectives[index].completed ? 
            'Objectif marqué comme terminé ! ✅' : 
            'Objectif marqué comme non terminé ⭕', 
            'success'
        );
    }
}

// Supprimer un objectif hebdomadaire
function deleteWeeklyObjective(index) {
    console.log('deleteWeeklyObjective appelé avec index:', index);
    
    if (userData.weeklyObjectives[index]) {
        userData.weeklyObjectives.splice(index, 1);
        saveUserData();
        updateWeeklyObjectives();
        showNotification('Objectif supprimé ! 🗑️', 'info');
    }
}

// Évaluation mensuelle
function showMonthlyAssessment() {
    console.log('Évaluation mensuelle');
    showNotification('Fonctionnalité d\'évaluation mensuelle - En cours de développement', 'info');
}

// Historique des niveaux
function showLevelHistory() {
    console.log('Historique des niveaux');
    showNotification('Fonctionnalité d\'historique - En cours de développement', 'info');
}

// Partager la progression
function showShareModal() {
    console.log('Partage de progression');
    showNotification('Fonctionnalité de partage - En cours de développement', 'info');
}

// Fonctions utilitaires
function getMonthName(monthIndex) {
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return months[monthIndex];
}

// Initialiser les événements
function initEvents() {
    console.log('Initialisation des événements');
    
    // Fonctions globales
    window.toggleWeeklyObjective = function(index) {
        console.log('toggleWeeklyObjective appelé avec index:', index);
        toggleWeeklyObjective(index);
    };
    window.deleteWeeklyObjective = function(index) {
        console.log('deleteWeeklyObjective appelé avec index:', index);
        deleteWeeklyObjective(index);
    };
    
    // Événements des boutons
    const elements = {
        'completeChallenge': completeChallenge,
        'changeChallenge': changeChallenge,
        'addWeeklyObjective': addWeeklyObjective,
        'monthlyAssessment': showMonthlyAssessment,
        'levelHistory': showLevelHistory,
        'shareProgress': showShareModal
    };
    
    Object.entries(elements).forEach(([id, handler]) => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`Événement ajouté pour ${id}`);
            element.addEventListener('click', handler);
        } else {
            console.warn(`Élément ${id} non trouvé`);
        }
    });
}

// Initialiser l'application
function init() {
    console.log('Initialisation de LevelUp V2');
    
    loadUserData();
    updateUI();
    initEvents();
    
    console.log('LevelUp V2 initialisé');
}

// Démarrer quand le DOM est prêt
document.addEventListener('DOMContentLoaded', init); 