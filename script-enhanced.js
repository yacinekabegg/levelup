// LevelUp Application - Version Améliorée
console.log('LevelUp Application - Version Améliorée chargée');

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

// Créer et afficher le modal d'ajout d'objectif
function addWeeklyObjective() {
    console.log('Ajout d\'objectif hebdomadaire');
    
    // Créer le modal
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
    
    // Ajouter le modal au DOM
    document.body.appendChild(modal);
    
    // Focus sur le premier champ
    setTimeout(() => {
        const textInput = document.getElementById('weeklyObjectiveText');
        if (textInput) textInput.focus();
    }, 100);
    
    // Gérer la soumission
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
        
        // Fermer le modal
        document.body.removeChild(modal);
        
        showNotification('Objectif hebdomadaire ajouté ! 📅', 'success');
    });
    
    // Gérer la fermeture
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('weeklyObjectiveModal')) {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeOnEscape);
            }
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
        if (confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
            userData.weeklyObjectives.splice(index, 1);
            saveUserData();
            updateWeeklyObjectives();
            showNotification('Objectif supprimé ! 🗑️', 'info');
        }
    }
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

// Autres fonctions simplifiées
function completeChallenge() {
    console.log('Défi complété');
    userData.xp += 30;
    saveUserData();
    updateUI();
    showNotification('Défi complété ! +30 XP 🎉', 'success');
}

function changeChallenge() {
    console.log('Changement de défi');
    showNotification('Nouveau défi ! 🔄', 'info');
}

function showMonthlyAssessment() {
    console.log('Évaluation mensuelle');
    showNotification('Fonctionnalité d\'évaluation mensuelle - En cours de développement', 'info');
}

function showLevelHistory() {
    console.log('Historique des niveaux');
    showNotification('Fonctionnalité d\'historique - En cours de développement', 'info');
}

function showShareModal() {
    console.log('Partage de progression');
    showNotification('Fonctionnalité de partage - En cours de développement', 'info');
}

// Rendre les fonctions globales
window.toggleWeeklyObjective = toggleWeeklyObjective;
window.deleteWeeklyObjective = deleteWeeklyObjective;

// Initialiser
function init() {
    console.log('Initialisation de LevelUp Amélioré');
    
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
    
    console.log('LevelUp Amélioré initialisé');
}

// Démarrer quand le DOM est prêt
document.addEventListener('DOMContentLoaded', init); 