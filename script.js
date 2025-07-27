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
        
        // Mettre à jour les objectifs hebdomadaires
        updateWeeklyObjectives();
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

    // Obtenir le nom du mois en français
    function getMonthName(monthIndex) {
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];
        return months[monthIndex];
    }

    // Basculer le statut d'un objectif hebdomadaire
    function toggleWeeklyObjective(index) {
        userData.weeklyObjectives[index].completed = !userData.weeklyObjectives[index].completed;
        saveUserData();
        updateWeeklyObjectives();
        
        const status = userData.weeklyObjectives[index].completed ? 'terminé' : 'non terminé';
        showNotification(`Objectif marqué comme ${status} ! ✅`, 'success');
    }

    // Supprimer un objectif hebdomadaire
    function deleteWeeklyObjective(index) {
        userData.weeklyObjectives.splice(index, 1);
        saveUserData();
        updateWeeklyObjectives();
        showNotification('Objectif hebdomadaire supprimé ! 🗑️', 'success');
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
        
        // Créer le modal d'ajout d'objectif
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
        
        // Ajouter les événements
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
            
            // Ajouter l'objectif
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
        
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Fermer en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
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

    // Rendre les fonctions accessibles globalement
    window.toggleWeeklyObjective = function(index) {
        console.log('toggleWeeklyObjective appelé avec index:', index);
        toggleWeeklyObjective(index);
    };
    window.deleteWeeklyObjective = function(index) {
        console.log('deleteWeeklyObjective appelé avec index:', index);
        deleteWeeklyObjective(index);
    };

    // Démarrer l'application
    init();
}); 