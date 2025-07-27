// Données de l'application LevelUp
class LevelUpApp {
    constructor() {
        this.userData = this.loadUserData();
        this.challenges = this.getChallenges();
        this.monthlyGoals = this.getMonthlyGoals();
        this.currentChallenge = this.getCurrentChallenge();
        this.init();
    }

    // Charger les données utilisateur depuis localStorage
    loadUserData() {
        const saved = localStorage.getItem('levelup_user_data');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
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
    }

    // Sauvegarder les données utilisateur
    saveUserData() {
        localStorage.setItem('levelup_user_data', JSON.stringify(this.userData));
    }

    // Défis disponibles
    getChallenges() {
        // Essayer de charger les défis depuis l'administration
        const adminChallenges = localStorage.getItem('levelup_challenges');
        if (adminChallenges) {
            return JSON.parse(adminChallenges);
        }
        
        // Défis par défaut si aucun défi administré n'est trouvé
        return [
            { text: "Appelle un ami que tu n'as pas vu depuis 6 mois", category: "Social", xp: 30 },
            { text: "Essaie une nouvelle recette de cuisine", category: "Créativité", xp: 25 },
            { text: "Fais 30 minutes d'exercice physique", category: "Santé", xp: 35 },
            { text: "Lis un chapitre d'un livre", category: "Apprentissage", xp: 20 },
            { text: "Complimente sincèrement 3 personnes", category: "Social", xp: 25 },
            { text: "Apprends 5 mots dans une nouvelle langue", category: "Apprentissage", xp: 20 },
            { text: "Fais une activité que tu redoutes depuis longtemps", category: "Courage", xp: 50 },
            { text: "Organise ton espace de travail", category: "Organisation", xp: 15 },
            { text: "Écris 3 choses pour lesquelles tu es reconnaissant", category: "Bien-être", xp: 20 },
            { text: "Fais une promenade dans un endroit nouveau", category: "Découverte", xp: 25 },
            { text: "Apprends à faire un nœud de cravate", category: "Compétence", xp: 30 },
            { text: "Donne un objet que tu aimes à quelqu'un", category: "Générosité", xp: 40 },
            { text: "Fais une méditation de 10 minutes", category: "Bien-être", xp: 25 },
            { text: "Répare quelque chose qui ne fonctionne plus", category: "Compétence", xp: 35 },
            { text: "Écris une lettre à quelqu'un que tu apprécies", category: "Social", xp: 30 },
            { text: "Essaie un nouveau style vestimentaire", category: "Créativité", xp: 25 },
            { text: "Fais une liste de tes objectifs pour l'année", category: "Organisation", xp: 20 },
            { text: "Apprends à jongler avec 3 balles", category: "Compétence", xp: 40 },
            { text: "Fais un don à une association", category: "Générosité", xp: 45 },
            { text: "Apprends à faire un origami", category: "Créativité", xp: 30 }
        ];
    }

    // Objectifs mensuels disponibles
    getMonthlyGoals() {
        return [
            "Gagner en confiance",
            "Être plus actif physiquement",
            "Développer ma créativité",
            "Améliorer mes relations sociales",
            "Apprendre de nouvelles compétences",
            "Prendre soin de ma santé mentale",
            "Être plus organisé",
            "Sortir de ma zone de confort"
        ];
    }

    // Obtenir le défi actuel
    getCurrentChallenge() {
        const today = new Date().toDateString();
        
        // Si c'est un nouveau jour, réinitialiser les rerolls
        if (this.userData.lastChallengeDate !== today) {
            this.userData.rerollsUsed = 0;
            this.userData.lastChallengeDate = today;
            this.saveUserData();
        }

        // Si pas de défi pour aujourd'hui, en choisir un nouveau
        if (!this.userData.currentChallenge || this.userData.lastChallengeDate !== today) {
            this.userData.currentChallenge = this.getRandomChallenge();
            this.userData.lastChallengeDate = today;
            this.saveUserData();
        }

        return this.userData.currentChallenge;
    }

    // Obtenir un défi aléatoire
    getRandomChallenge() {
        const availableChallenges = this.challenges.filter(challenge => 
            !this.userData.completedChallenges.includes(challenge.text)
        );
        
        if (availableChallenges.length === 0) {
            // Si tous les défis ont été complétés, réinitialiser
            this.userData.completedChallenges = [];
            return this.challenges[Math.floor(Math.random() * this.challenges.length)];
        }
        
        return availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    }

    // Initialiser l'application
    init() {
        this.updateUI();
        this.bindEvents();
        this.updateAvatar();
        this.updateWeeklyObjectives();
    }

    // Mettre à jour l'interface utilisateur
    updateUI() {
        // Mettre à jour le niveau et XP
        document.getElementById('currentLevel').textContent = this.userData.level;
        document.getElementById('currentXP').textContent = this.userData.xp;
        document.getElementById('maxXP').textContent = this.userData.maxXp;
        
        // Mettre à jour la barre XP
        const xpPercentage = (this.userData.xp / this.userData.maxXp) * 100;
        const xpBar = document.getElementById('xpBar');
        xpBar.style.width = `${xpPercentage}%`;
        xpBar.style.setProperty('--xp-percentage', `${xpPercentage}%`);

        // Mettre à jour le défi
        document.getElementById('challengeText').textContent = this.currentChallenge.text;
        document.getElementById('challengeCategory').textContent = this.currentChallenge.category;

        // Mettre à jour les rerolls restants
        const rerollsLeft = Math.max(0, 1 - this.userData.rerollsUsed);
        document.getElementById('rerollsLeft').innerHTML = 
            `Rerolls restants aujourd'hui: <span class="font-semibold">${rerollsLeft}</span>`;

        // Mettre à jour les objectifs mensuels
        this.updateMonthlyGoals();
        
        // Mettre à jour les objectifs hebdomadaires
        this.updateWeeklyObjectives();
    }

    // Mettre à jour les objectifs mensuels
    updateMonthlyGoals() {
        const goalsContainer = document.getElementById('monthlyGoals');
        goalsContainer.innerHTML = '';

        if (this.userData.monthlyGoals.length === 0) {
            goalsContainer.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <div class="text-4xl mb-2">🎯</div>
                    <p>Aucun objectif mensuel défini</p>
                    <p class="text-sm">Cliquez sur "Évaluation Mensuelle" pour définir vos objectifs</p>
                </div>
            `;
            return;
        }

        this.userData.monthlyGoals.forEach((goal, index) => {
            const progress = Math.floor(Math.random() * 100); // Simulation pour l'exemple
            const goalElement = document.createElement('div');
            goalElement.className = 'flex items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200';
            goalElement.innerHTML = `
                <div class="w-4 h-4 bg-pink-500 rounded-full mr-3"></div>
                <span class="text-gray-700">${goal}</span>
                <div class="ml-auto">
                    <div class="w-16 h-2 bg-gray-200 rounded-full">
                        <div class="w-${Math.floor(progress / 6.25)} h-2 bg-pink-500 rounded-full goal-progress"></div>
                    </div>
                </div>
            `;
            goalsContainer.appendChild(goalElement);
        });
    }

    // Mettre à jour les objectifs hebdomadaires
    updateWeeklyObjectives() {
        const objectivesContainer = document.getElementById('weeklyObjectives');
        const weekDatesElement = document.getElementById('weekDates');
        
        // Calculer les dates de la semaine actuelle
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        weekDatesElement.textContent = `Semaine du ${startOfWeek.getDate()} ${this.getMonthName(startOfWeek.getMonth())} au ${endOfWeek.getDate()} ${this.getMonthName(endOfWeek.getMonth())}`;
        
        objectivesContainer.innerHTML = '';

        if (this.userData.weeklyObjectives.length === 0) {
            objectivesContainer.innerHTML = `
                <div class="text-center py-6 text-gray-500">
                    <div class="text-3xl mb-2">📅</div>
                    <p>Aucun objectif hebdomadaire</p>
                    <p class="text-sm">Ajoutez vos objectifs pour la semaine</p>
                </div>
            `;
            return;
        }

        this.userData.weeklyObjectives.forEach((objective, index) => {
            const priorityColors = {
                low: 'bg-green-100 text-green-800 border-green-200',
                medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                high: 'bg-red-100 text-red-800 border-red-200'
            };
            
            const priorityIcons = {
                low: '🟢',
                medium: '🟡',
                high: '🔴'
            };

            const objectiveElement = document.createElement('div');
            objectiveElement.className = `flex items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200`;
            objectiveElement.innerHTML = `
                <div class="flex items-center flex-1">
                    <span class="text-lg mr-3">${priorityIcons[objective.priority]}</span>
                    <div class="flex-1">
                        <div class="font-medium text-gray-800">${objective.text}</div>
                        <div class="text-sm text-gray-600">${objective.category}</div>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="app.toggleWeeklyObjective(${index})" class="text-green-600 hover:text-green-800 p-1" title="${objective.completed ? 'Marquer comme non terminé' : 'Marquer comme terminé'}">
                        ${objective.completed ? '✅' : '⭕'}
                    </button>
                    <button onclick="app.deleteWeeklyObjective(${index})" class="text-red-600 hover:text-red-800 p-1" title="Supprimer">
                        🗑️
                    </button>
                </div>
            `;
            
            if (objective.completed) {
                objectiveElement.classList.add('opacity-60');
            }
            
            objectivesContainer.appendChild(objectiveElement);
        });
    }

    // Obtenir le nom du mois en français
    getMonthName(monthIndex) {
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];
        return months[monthIndex];
    }

    // Mettre à jour l'avatar selon le niveau
    updateAvatar() {
        const avatar = document.getElementById('avatar');
        const avatars = ['🐣', '🐤', '🐥', '🦁', '🐯', '🐸', '🐼', '🐨', '🦊', '🐺'];
        const avatarIndex = Math.min(Math.floor(this.userData.level / 2), avatars.length - 1);
        avatar.textContent = avatars[avatarIndex];
    }

    // Compléter un défi
    completeChallenge() {
        // Ajouter XP
        this.userData.xp += this.currentChallenge.xp;
        this.userData.totalXp += this.currentChallenge.xp;

        // Vérifier si le niveau augmente
        while (this.userData.xp >= this.userData.maxXp) {
            this.userData.xp -= this.userData.maxXp;
            this.userData.level++;
            this.userData.maxXp = Math.floor(this.userData.maxXp * 1.2);
            
            // Ajouter à l'historique
            this.userData.levelHistory.push({
                level: this.userData.level,
                date: new Date().toISOString().split('T')[0],
                xp: this.userData.totalXp
            });
        }

        // Marquer le défi comme complété
        this.userData.completedChallenges.push(this.currentChallenge.text);

        // Choisir un nouveau défi pour demain
        this.userData.currentChallenge = this.getRandomChallenge();

        this.saveUserData();
        this.updateUI();
        this.updateAvatar();
        this.showNotification(`+${this.currentChallenge.xp} XP ! Défi complété ! 🎉`);
        this.createConfetti();
    }

    // Changer de défi
    changeChallenge() {
        const today = new Date().toDateString();
        
        if (this.userData.lastRerollDate !== today) {
            this.userData.rerollsUsed = 0;
        }

        if (this.userData.rerollsUsed >= 1) {
            this.showNotification("Tu as déjà utilisé ton reroll aujourd'hui ! 😅");
            return;
        }

        this.userData.rerollsUsed++;
        this.userData.lastRerollDate = today;
        this.currentChallenge = this.getRandomChallenge();
        this.userData.currentChallenge = this.currentChallenge;

        this.saveUserData();
        this.updateUI();
        this.showNotification("Nouveau défi généré ! 🔄");
    }

    // Afficher une notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Créer des confettis
    createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#78350f'][Math.floor(Math.random() * 5)];
            document.body.appendChild(confetti);

            setTimeout(() => {
                if (document.body.contains(confetti)) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }
    }

    // Afficher l'historique des niveaux
    showLevelHistory() {
        const modal = document.getElementById('levelModal');
        const historyContainer = document.getElementById('levelHistory');
        
        historyContainer.innerHTML = '';
        
        this.userData.levelHistory.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200';
            entryElement.innerHTML = `
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                        ${entry.level}
                    </div>
                    <div>
                        <div class="font-semibold text-gray-800">Niveau ${entry.level}</div>
                        <div class="text-sm text-gray-600">${entry.date}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-600">Total XP</div>
                    <div class="font-semibold text-purple-600">${entry.xp}</div>
                </div>
            `;
            historyContainer.appendChild(entryElement);
        });
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('modal-open');
    }

    // Afficher la modale de partage
    showShareModal() {
        const modal = document.getElementById('shareModal');
        document.getElementById('shareLevel').textContent = this.userData.level;
        document.getElementById('shareXP').textContent = this.userData.totalXp;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('modal-open');
    }

    // Fermer les modales
    closeModals() {
        const modals = document.querySelectorAll('#shareModal, #levelModal, #monthlyAssessmentModal, #weeklyObjectiveModal');
        modals.forEach(modal => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
        document.body.classList.remove('modal-open');
    }

    // Ajouter un objectif hebdomadaire
    addWeeklyObjective(objectiveData) {
        const newObjective = {
            id: Date.now(),
            text: objectiveData.text,
            category: objectiveData.category,
            priority: objectiveData.priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.userData.weeklyObjectives.push(newObjective);
        this.saveUserData();
        this.updateWeeklyObjectives();
        this.showNotification('Objectif hebdomadaire ajouté ! 📅', 'success');
    }

    // Basculer le statut d'un objectif hebdomadaire
    toggleWeeklyObjective(index) {
        this.userData.weeklyObjectives[index].completed = !this.userData.weeklyObjectives[index].completed;
        this.saveUserData();
        this.updateWeeklyObjectives();
        
        const status = this.userData.weeklyObjectives[index].completed ? 'terminé' : 'non terminé';
        this.showNotification(`Objectif marqué comme ${status} ! ✅`, 'success');
    }

    // Supprimer un objectif hebdomadaire
    deleteWeeklyObjective(index) {
        this.userData.weeklyObjectives.splice(index, 1);
        this.saveUserData();
        this.updateWeeklyObjectives();
        this.showNotification('Objectif hebdomadaire supprimé ! 🗑️', 'success');
    }

    // Afficher l'évaluation mensuelle
    showMonthlyAssessment() {
        const modal = document.getElementById('monthlyAssessmentModal');
        const questionsContainer = document.getElementById('assessmentQuestions');
        
        // Questions d'évaluation mensuelle
        const questions = [
            {
                id: 'confidence',
                title: 'Confiance en soi',
                description: 'Comment évaluez-vous votre niveau de confiance en soi ?',
                options: [
                    { value: 1, label: 'Très faible', description: 'J\'ai du mal à m\'affirmer' },
                    { value: 2, label: 'Faible', description: 'Je manque souvent de confiance' },
                    { value: 3, label: 'Moyenne', description: 'Je suis parfois confiant' },
                    { value: 4, label: 'Bonne', description: 'Je suis généralement confiant' },
                    { value: 5, label: 'Excellente', description: 'Je suis très confiant en moi' }
                ]
            },
            {
                id: 'social',
                title: 'Compétences sociales',
                description: 'Comment évaluez-vous vos compétences sociales ?',
                options: [
                    { value: 1, label: 'Très faibles', description: 'J\'ai du mal à communiquer' },
                    { value: 2, label: 'Faibles', description: 'Je suis souvent timide' },
                    { value: 3, label: 'Moyennes', description: 'Je communique correctement' },
                    { value: 4, label: 'Bonnes', description: 'Je suis à l\'aise socialement' },
                    { value: 5, label: 'Excellentes', description: 'Je suis très sociable' }
                ]
            },
            {
                id: 'physical',
                title: 'Activité physique',
                description: 'Comment évaluez-vous votre niveau d\'activité physique ?',
                options: [
                    { value: 1, label: 'Très faible', description: 'Je ne fais jamais de sport' },
                    { value: 2, label: 'Faible', description: 'Je fais rarement de l\'exercice' },
                    { value: 3, label: 'Moyen', description: 'Je fais du sport occasionnellement' },
                    { value: 4, label: 'Bon', description: 'Je fais du sport régulièrement' },
                    { value: 5, label: 'Excellent', description: 'Je suis très actif physiquement' }
                ]
            },
            {
                id: 'learning',
                title: 'Apprentissage',
                description: 'Comment évaluez-vous votre envie d\'apprendre de nouvelles choses ?',
                options: [
                    { value: 1, label: 'Très faible', description: 'Je n\'aime pas apprendre' },
                    { value: 2, label: 'Faible', description: 'Je préfère rester dans ma zone de confort' },
                    { value: 3, label: 'Moyenne', description: 'J\'apprends quand c\'est nécessaire' },
                    { value: 4, label: 'Bonne', description: 'J\'aime découvrir de nouvelles choses' },
                    { value: 5, label: 'Excellente', description: 'Je suis passionné d\'apprentissage' }
                ]
            },
            {
                id: 'creativity',
                title: 'Créativité',
                description: 'Comment évaluez-vous votre niveau de créativité ?',
                options: [
                    { value: 1, label: 'Très faible', description: 'Je ne suis pas créatif' },
                    { value: 2, label: 'Faible', description: 'J\'ai du mal à être créatif' },
                    { value: 3, label: 'Moyenne', description: 'Je suis créatif parfois' },
                    { value: 4, label: 'Bonne', description: 'Je suis assez créatif' },
                    { value: 5, label: 'Excellente', description: 'Je suis très créatif' }
                ]
            }
        ];

        // Remplir les questions
        questionsContainer.innerHTML = '';
        questions.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.className = 'bg-gray-50 rounded-lg p-6';
            questionElement.innerHTML = `
                <h4 class="text-lg font-semibold text-gray-800 mb-2">${question.title}</h4>
                <p class="text-gray-600 mb-4">${question.description}</p>
                <div class="space-y-2">
                    ${question.options.map(option => `
                        <label class="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                            <input type="radio" name="${question.id}" value="${option.value}" class="mr-3 text-blue-600 focus:ring-blue-500">
                            <div class="flex-1">
                                <div class="font-medium text-gray-800">${option.label}</div>
                                <div class="text-sm text-gray-600">${option.description}</div>
                            </div>
                        </label>
                    `).join('')}
                </div>
            `;
            questionsContainer.appendChild(questionElement);
        });

        // Pré-remplir avec les données existantes
        if (this.userData.monthlyAssessment) {
            Object.keys(this.userData.monthlyAssessment).forEach(questionId => {
                const value = this.userData.monthlyAssessment[questionId];
                const radio = document.querySelector(`input[name="${questionId}"][value="${value}"]`);
                if (radio) radio.checked = true;
            });
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('modal-open');
    }

    // Sauvegarder l'évaluation mensuelle
    saveMonthlyAssessment() {
        const assessment = {};
        const questions = ['confidence', 'social', 'physical', 'learning', 'creativity'];
        
        questions.forEach(questionId => {
            const selected = document.querySelector(`input[name="${questionId}"]:checked`);
            if (selected) {
                assessment[questionId] = parseInt(selected.value);
            }
        });

        if (Object.keys(assessment).length < questions.length) {
            this.showNotification('Veuillez répondre à toutes les questions !', 'error');
            return;
        }

        this.userData.monthlyAssessment = assessment;
        this.userData.lastAssessmentDate = new Date().toISOString();
        
        // Générer des objectifs basés sur l'évaluation
        this.generateMonthlyGoals(assessment);
        
        this.saveUserData();
        this.updateMonthlyGoals();
        this.closeModals();
        this.showNotification('Évaluation mensuelle sauvegardée ! 📊', 'success');
    }

    // Générer des objectifs mensuels basés sur l'évaluation
    generateMonthlyGoals(assessment) {
        const goals = [];
        
        if (assessment.confidence <= 3) {
            goals.push('Développer ma confiance en moi');
        }
        if (assessment.social <= 3) {
            goals.push('Améliorer mes compétences sociales');
        }
        if (assessment.physical <= 3) {
            goals.push('Augmenter mon activité physique');
        }
        if (assessment.learning <= 3) {
            goals.push('Cultiver ma curiosité et mon envie d\'apprendre');
        }
        if (assessment.creativity <= 3) {
            goals.push('Développer ma créativité');
        }
        
        // Ajouter des objectifs généraux si pas assez d'objectifs spécifiques
        if (goals.length < 2) {
            goals.push('Sortir de ma zone de confort');
            goals.push('Prendre soin de ma santé mentale');
        }
        
        this.userData.monthlyGoals = goals.slice(0, 3); // Limiter à 3 objectifs
    }

    // Lier les événements
    bindEvents() {
        // Bouton compléter défi
        document.getElementById('completeChallenge').addEventListener('click', () => {
            this.completeChallenge();
        });

        // Bouton changer défi
        document.getElementById('changeChallenge').addEventListener('click', () => {
            this.changeChallenge();
        });

        // Bouton voir niveaux
        document.getElementById('viewLevels').addEventListener('click', () => {
            this.showLevelHistory();
        });

        // Bouton partager progression
        document.getElementById('shareProgress').addEventListener('click', () => {
            this.showShareModal();
        });

        // Fermer les modales
        document.getElementById('closeShareModal').addEventListener('click', () => {
            this.closeModals();
        });

        document.getElementById('closeLevelModal').addEventListener('click', () => {
            this.closeModals();
        });

        // Fermer les modales en cliquant à l'extérieur
        document.querySelectorAll('#shareModal, #levelModal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Fermer les modales avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });

        // Évaluation mensuelle
        document.getElementById('monthlyAssessment').addEventListener('click', () => {
            this.showMonthlyAssessment();
        });

        // Sauvegarder l'évaluation mensuelle
        document.getElementById('saveAssessment').addEventListener('click', () => {
            this.saveMonthlyAssessment();
        });

        // Fermer l'évaluation mensuelle
        document.getElementById('closeAssessmentModal').addEventListener('click', () => {
            this.closeModals();
        });

        // Ajouter un objectif hebdomadaire
        document.getElementById('addWeeklyObjective').addEventListener('click', () => {
            const modal = document.getElementById('weeklyObjectiveModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('modal-open');
        });

        // Sauvegarder un objectif hebdomadaire
        document.getElementById('saveWeeklyObjective').addEventListener('click', () => {
            const text = document.getElementById('weeklyObjectiveText').value.trim();
            const category = document.getElementById('weeklyObjectiveCategory').value;
            const priority = document.getElementById('weeklyObjectivePriority').value;

            if (!text) {
                this.showNotification('Veuillez saisir un objectif !', 'error');
                return;
            }

            this.addWeeklyObjective({ text, category, priority });
            
            // Réinitialiser le formulaire
            document.getElementById('weeklyObjectiveForm').reset();
            this.closeModals();
        });

        // Fermer l'ajout d'objectif hebdomadaire
        document.getElementById('closeWeeklyObjectiveModal').addEventListener('click', () => {
            this.closeModals();
        });
    }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new LevelUpApp();
}); 