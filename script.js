// LevelUp Application - Version Ultra Simple
console.log('LevelUp Application - Version Ultra Simple chargée');

// Données utilisateur
let userData = {
    level: 3,
    xp: 120,
    maxXp: 200,
    weeklyObjectives: []
};

// Charger les données
function loadUserData() {
    const saved = localStorage.getItem('levelup_userdata');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            userData = { ...userData, ...parsed };
            console.log('Données chargées:', userData);
        } catch (e) {
            console.error('Erreur lors du chargement:', e);
        }
    }
}

// Sauvegarder les données
function saveUserData() {
    try {
        localStorage.setItem('levelup_userdata', JSON.stringify(userData));
        console.log('Données sauvegardées');
    } catch (e) {
        console.error('Erreur lors de la sauvegarde:', e);
    }
}

// Mettre à jour l'interface
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
    
    // Mettre à jour les objectifs hebdomadaires
    updateWeeklyObjectives();
}

// Mettre à jour les objectifs hebdomadaires
function updateWeeklyObjectives() {
    console.log('Mise à jour des objectifs hebdomadaires');
    console.log('Objectifs actuels:', userData.weeklyObjectives);
    
    const objectivesContainer = document.getElementById('weeklyObjectives');
    
    console.log('Container trouvé:', objectivesContainer);
    
    if (!objectivesContainer) {
        console.error('Container weeklyObjectives non trouvé');
        return;
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
                <span class="text-lg mr-3">${priorityIcons[objective.priority] || '🟡'}</span>
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

// Ajouter un objectif hebdomadaire
function addWeeklyObjective() {
    console.log('Ajout d\'objectif hebdomadaire');
    
    const text = prompt('Texte de l\'objectif :');
    if (!text) return;
    
    const category = prompt('Catégorie :');
    if (!category) return;
    
    const priority = prompt('Priorité (low/medium/high) :', 'medium');
    
    const newObjective = {
        id: Date.now(),
        text: text,
        category: category,
        priority: priority || 'medium',
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
    
    alert('Objectif hebdomadaire ajouté ! 📅');
}

// Basculer un objectif hebdomadaire
function toggleWeeklyObjective(index) {
    console.log('toggleWeeklyObjective appelé avec index:', index);
    
    if (userData.weeklyObjectives[index]) {
        userData.weeklyObjectives[index].completed = !userData.weeklyObjectives[index].completed;
        saveUserData();
        updateWeeklyObjectives();
        alert(userData.weeklyObjectives[index].completed ? 
            'Objectif marqué comme terminé ! ✅' : 
            'Objectif marqué comme non terminé ⭕');
    }
}

// Supprimer un objectif hebdomadaire
function deleteWeeklyObjective(index) {
    console.log('deleteWeeklyObjective appelé avec index:', index);
    
    if (userData.weeklyObjectives[index]) {
        userData.weeklyObjectives.splice(index, 1);
        saveUserData();
        updateWeeklyObjectives();
        alert('Objectif supprimé ! 🗑️');
    }
}

// Autres fonctions simplifiées
function completeChallenge() {
    console.log('Défi complété');
    userData.xp += 30;
    saveUserData();
    updateUI();
    alert('Défi complété ! +30 XP 🎉');
}

function changeChallenge() {
    console.log('Changement de défi');
    alert('Nouveau défi ! 🔄');
}

function showMonthlyAssessment() {
    console.log('Évaluation mensuelle');
    alert('Fonctionnalité d\'évaluation mensuelle - En cours de développement');
}

function showLevelHistory() {
    console.log('Historique des niveaux');
    alert('Fonctionnalité d\'historique - En cours de développement');
}

function showShareModal() {
    console.log('Partage de progression');
    alert('Fonctionnalité de partage - En cours de développement');
}

// Rendre les fonctions globales
window.toggleWeeklyObjective = toggleWeeklyObjective;
window.deleteWeeklyObjective = deleteWeeklyObjective;

// Initialiser
function init() {
    console.log('Initialisation de LevelUp Ultra Simple');
    
    loadUserData();
    updateUI();
    
    // Ajouter les événements
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
    
    console.log('LevelUp Ultra Simple initialisé');
}

// Démarrer quand le DOM est prêt
document.addEventListener('DOMContentLoaded', init); 