// Interface d'administration pour LevelUp
class LevelUpAdmin {
    constructor() {
        this.challenges = this.loadChallenges();
        this.categories = this.loadCategories();
        this.currentEditingId = null;
        this.showOnlyActive = false;
        this.selectedCategory = '';
        this.currentView = 'list'; // 'list' ou 'table'
        
        // Filtres du tableau
        this.tableFilters = {
            search: '',
            category: '',
            status: '',
            sortBy: 'id',
            sortOrder: 'asc'
        };
        
        this.init();
    }

    // Charger les défis depuis localStorage
    loadChallenges() {
        const saved = localStorage.getItem('levelup_admin_challenges');
        if (saved) {
            return JSON.parse(saved);
        }
        // Défis par défaut
        return [
            { id: 1, text: "Appelle un ami que tu n'as pas vu depuis 6 mois", category: "Social", xp: 30, active: true },
            { id: 2, text: "Essaie une nouvelle recette de cuisine", category: "Créativité", xp: 25, active: true },
            { id: 3, text: "Fais 30 minutes d'exercice physique", category: "Santé", xp: 35, active: true },
            { id: 4, text: "Lis un chapitre d'un livre", category: "Apprentissage", xp: 20, active: true },
            { id: 5, text: "Complimente sincèrement 3 personnes", category: "Social", xp: 25, active: true },
            { id: 6, text: "Apprends 5 mots dans une nouvelle langue", category: "Apprentissage", xp: 20, active: true },
            { id: 7, text: "Fais une activité que tu redoutes depuis longtemps", category: "Courage", xp: 50, active: true },
            { id: 8, text: "Organise ton espace de travail", category: "Organisation", xp: 15, active: true },
            { id: 9, text: "Écris 3 choses pour lesquelles tu es reconnaissant", category: "Bien-être", xp: 20, active: true },
            { id: 10, text: "Fais une promenade dans un endroit nouveau", category: "Découverte", xp: 25, active: true },
            { id: 11, text: "Apprends à faire un nœud de cravate", category: "Compétence", xp: 30, active: true },
            { id: 12, text: "Donne un objet que tu aimes à quelqu'un", category: "Générosité", xp: 40, active: true },
            { id: 13, text: "Fais une méditation de 10 minutes", category: "Bien-être", xp: 25, active: true },
            { id: 14, text: "Répare quelque chose qui ne fonctionne plus", category: "Compétence", xp: 35, active: true },
            { id: 15, text: "Écris une lettre à quelqu'un que tu apprécies", category: "Social", xp: 30, active: true },
            { id: 16, text: "Essaie un nouveau style vestimentaire", category: "Créativité", xp: 25, active: true },
            { id: 17, text: "Fais une liste de tes objectifs pour l'année", category: "Organisation", xp: 20, active: true },
            { id: 18, text: "Apprends à jongler avec 3 balles", category: "Compétence", xp: 40, active: true },
            { id: 19, text: "Fais un don à une association", category: "Générosité", xp: 45, active: true },
            { id: 20, text: "Apprends à faire un origami", category: "Créativité", xp: 30, active: true }
        ];
    }

    // Charger les catégories
    loadCategories() {
        const saved = localStorage.getItem('levelup_admin_categories');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            { name: "Social", emoji: "🗣️" },
            { name: "Créativité", emoji: "🎨" },
            { name: "Santé", emoji: "💪" },
            { name: "Apprentissage", emoji: "📚" },
            { name: "Courage", emoji: "🦁" },
            { name: "Organisation", emoji: "📋" },
            { name: "Bien-être", emoji: "🧘" },
            { name: "Compétence", emoji: "🎯" },
            { name: "Générosité", emoji: "🎁" },
            { name: "Découverte", emoji: "🌍" }
        ];
    }

    // Sauvegarder les défis
    saveChallenges() {
        localStorage.setItem('levelup_admin_challenges', JSON.stringify(this.challenges));
        // Mettre à jour aussi les défis pour l'application principale
        const mainAppChallenges = this.challenges
            .filter(c => c.active)
            .map(c => ({ text: c.text, category: c.category, xp: c.xp }));
        localStorage.setItem('levelup_challenges', JSON.stringify(mainAppChallenges));
    }

    // Sauvegarder les catégories
    saveCategories() {
        localStorage.setItem('levelup_admin_categories', JSON.stringify(this.categories));
    }

    // Initialiser l'interface
    init() {
        this.updateStats();
        this.renderChallenges();
        this.renderCategories();
        this.bindEvents();
        this.updateCategoryFilter();
        this.updateCategorySelect();
        this.updateTableFilters();
        this.updateSortIndicators();
    }

    // Mettre à jour les statistiques
    updateStats() {
        document.getElementById('totalChallenges').textContent = this.challenges.length;
        document.getElementById('activeChallenges').textContent = this.challenges.filter(c => c.active).length;
        document.getElementById('totalCategories').textContent = this.categories.length;
        document.getElementById('totalUsers').textContent = this.getUserCount();
    }

    // Obtenir le nombre d'utilisateurs
    getUserCount() {
        // Compter les clés localStorage qui commencent par 'levelup_user_data'
        let count = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('levelup_user_data')) {
                count++;
            }
        }
        return count;
    }

    // Rendre la liste des défis
    renderChallenges() {
        let filteredChallenges = this.challenges;

        // Filtrer par catégorie
        if (this.selectedCategory) {
            filteredChallenges = filteredChallenges.filter(c => c.category === this.selectedCategory);
        }

        // Filtrer par statut actif
        if (this.showOnlyActive) {
            filteredChallenges = filteredChallenges.filter(c => c.active);
        }

        if (this.currentView === 'list') {
            this.renderChallengesList(filteredChallenges);
        } else {
            this.renderChallengesTable(filteredChallenges);
        }
    }

    // Rendre la vue liste
    renderChallengesList(challenges) {
        const container = document.getElementById('challengesListView');
        container.innerHTML = '';

        challenges.forEach(challenge => {
            const challengeElement = document.createElement('div');
            challengeElement.className = `challenge-item p-4 bg-white rounded-lg shadow-sm border ${challenge.active ? 'active' : 'inactive'}`;
            
            const categoryEmoji = this.categories.find(c => c.name === challenge.category)?.emoji || '📋';
            
            challengeElement.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-sm font-medium text-gray-600">${categoryEmoji} ${challenge.category}</span>
                            <span class="status-badge ${challenge.active ? 'active' : 'inactive'}">
                                ${challenge.active ? 'Actif' : 'Inactif'}
                            </span>
                            <span class="text-sm font-semibold text-purple-600">${challenge.xp} XP</span>
                        </div>
                        <p class="text-gray-800 mb-3">${challenge.text}</p>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="admin.editChallenge(${challenge.id})" class="text-blue-600 hover:text-blue-800 p-1" title="Modifier">
                            ✏️
                        </button>
                        <button onclick="admin.toggleChallenge(${challenge.id})" class="text-green-600 hover:text-green-800 p-1" title="${challenge.active ? 'Désactiver' : 'Activer'}">
                            ${challenge.active ? '⏸️' : '▶️'}
                        </button>
                        <button onclick="admin.deleteChallenge(${challenge.id})" class="text-red-600 hover:text-red-800 p-1" title="Supprimer">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(challengeElement);
        });
    }

    // Rendre la vue tableau
    renderChallengesTable(challenges) {
        // Appliquer les filtres du tableau
        let filteredChallenges = this.applyTableFilters(challenges);
        
        const tbody = document.getElementById('challengesTableBody');
        tbody.innerHTML = '';

        filteredChallenges.forEach(challenge => {
            const categoryEmoji = this.categories.find(c => c.name === challenge.category)?.emoji || '📋';
            
            const row = document.createElement('tr');
            row.className = `border-b hover:bg-gray-50 ${challenge.active ? 'active' : 'inactive'}`;
            
            row.innerHTML = `
                <td class="table-cell-id">
                    <span class="text-gray-500 font-mono text-xs">#${challenge.id}</span>
                </td>
                <td class="table-cell-text">
                    <div class="max-w-xs">
                        <p class="text-gray-800 font-medium">${challenge.text}</p>
                    </div>
                </td>
                <td class="table-cell-category">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ${categoryEmoji} ${challenge.category}
                    </span>
                </td>
                <td class="table-cell-xp">
                    <span class="font-semibold text-purple-600">${challenge.xp} XP</span>
                </td>
                <td class="table-cell-status">
                    <span class="status-badge ${challenge.active ? 'active' : 'inactive'}">
                        ${challenge.active ? 'Actif' : 'Inactif'}
                    </span>
                </td>
                <td class="table-cell-actions">
                    <div class="flex space-x-2 justify-center">
                        <button onclick="admin.editChallenge(${challenge.id})" class="text-blue-600 hover:text-blue-800 p-1" title="Modifier">
                            ✏️
                        </button>
                        <button onclick="admin.toggleChallenge(${challenge.id})" class="text-green-600 hover:text-green-800 p-1" title="${challenge.active ? 'Désactiver' : 'Activer'}">
                            ${challenge.active ? '⏸️' : '▶️'}
                        </button>
                        <button onclick="admin.deleteChallenge(${challenge.id})" class="text-red-600 hover:text-red-800 p-1" title="Supprimer">
                            🗑️
                        </button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        });

        // Mettre à jour le compteur de résultats
        this.updateTableResultsCount(filteredChallenges.length);
    }

    // Appliquer les filtres du tableau
    applyTableFilters(challenges) {
        let filtered = [...challenges];

        // Filtre de recherche
        if (this.tableFilters.search) {
            const searchTerm = this.tableFilters.search.toLowerCase();
            filtered = filtered.filter(challenge => 
                challenge.text.toLowerCase().includes(searchTerm) ||
                challenge.category.toLowerCase().includes(searchTerm)
            );
        }

        // Filtre par catégorie
        if (this.tableFilters.category) {
            filtered = filtered.filter(challenge => challenge.category === this.tableFilters.category);
        }

        // Filtre par statut
        if (this.tableFilters.status) {
            if (this.tableFilters.status === 'active') {
                filtered = filtered.filter(challenge => challenge.active);
            } else if (this.tableFilters.status === 'inactive') {
                filtered = filtered.filter(challenge => !challenge.active);
            }
        }

        // Tri
        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch (this.tableFilters.sortBy) {
                case 'id':
                    aValue = a.id;
                    bValue = b.id;
                    break;
                case 'text':
                case 'text-desc':
                    aValue = a.text.toLowerCase();
                    bValue = b.text.toLowerCase();
                    break;
                case 'category':
                    aValue = a.category.toLowerCase();
                    bValue = b.category.toLowerCase();
                    break;
                case 'xp':
                case 'xp-desc':
                    aValue = a.xp;
                    bValue = b.xp;
                    break;
                case 'status':
                    aValue = a.active ? 1 : 0;
                    bValue = b.active ? 1 : 0;
                    break;
                default:
                    return 0;
            }

            if (this.tableFilters.sortOrder === 'desc' || this.tableFilters.sortBy.includes('-desc')) {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            } else {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            }
        });

        return filtered;
    }

    // Mettre à jour le compteur de résultats
    updateTableResultsCount(count) {
        const countElement = document.getElementById('tableResultsCount');
        countElement.textContent = `${count} défi${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}`;
    }

    // Trier le tableau
    sortTable(column) {
        if (this.tableFilters.sortBy === column) {
            // Inverser l'ordre si on clique sur la même colonne
            this.tableFilters.sortOrder = this.tableFilters.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            // Nouvelle colonne, ordre ascendant par défaut
            this.tableFilters.sortBy = column;
            this.tableFilters.sortOrder = 'asc';
        }

        this.updateSortIndicators();
        this.renderChallenges();
    }

    // Mettre à jour les indicateurs de tri
    updateSortIndicators() {
        const indicators = ['id', 'text', 'category', 'xp', 'status'];
        
        indicators.forEach(indicator => {
            const element = document.getElementById(`sort-${indicator}`);
            if (element) {
                if (this.tableFilters.sortBy === indicator) {
                    element.textContent = this.tableFilters.sortOrder === 'asc' ? '↑' : '↓';
                } else {
                    element.textContent = '↕️';
                }
            }
        });
    }

    // Rendre la liste des catégories
    renderCategories() {
        const container = document.getElementById('categoriesList');
        container.innerHTML = '';

        this.categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-item flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200';
            
            const challengeCount = this.challenges.filter(c => c.category === category.name).length;
            
            categoryElement.innerHTML = `
                <div class="flex items-center">
                    <span class="text-xl mr-3">${category.emoji}</span>
                    <div>
                        <div class="font-semibold text-gray-800">${category.name}</div>
                        <div class="text-sm text-gray-600">${challengeCount} défi${challengeCount > 1 ? 's' : ''}</div>
                    </div>
                </div>
                <button onclick="admin.deleteCategory('${category.name}')" class="text-red-600 hover:text-red-800 p-1" title="Supprimer">
                    🗑️
                </button>
            `;
            
            container.appendChild(categoryElement);
        });
    }

    // Mettre à jour le filtre des catégories
    updateCategoryFilter() {
        const filter = document.getElementById('categoryFilter');
        filter.innerHTML = '<option value="">Toutes les catégories</option>';
        
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = `${category.emoji} ${category.name}`;
            filter.appendChild(option);
        });
    }

    // Mettre à jour les filtres du tableau
    updateTableFilters() {
        // Filtre de catégorie du tableau
        const tableCategoryFilter = document.getElementById('tableCategoryFilter');
        tableCategoryFilter.innerHTML = '<option value="">Toutes les catégories</option>';
        
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = `${category.emoji} ${category.name}`;
            tableCategoryFilter.appendChild(option);
        });
    }

    // Effacer tous les filtres du tableau
    clearTableFilters() {
        this.tableFilters = {
            search: '',
            category: '',
            status: '',
            sortBy: 'id',
            sortOrder: 'asc'
        };

        // Réinitialiser les champs
        document.getElementById('tableSearch').value = '';
        document.getElementById('tableCategoryFilter').value = '';
        document.getElementById('tableStatusFilter').value = '';
        document.getElementById('tableSort').value = 'id';

        // Mettre à jour les indicateurs de tri
        this.updateSortIndicators();

        // Re-rendre le tableau
        this.renderChallenges();
    }

    // Mettre à jour le sélecteur de catégories dans le formulaire
    updateCategorySelect() {
        const select = document.getElementById('challengeCategory');
        const currentValue = select.value; // Sauvegarder la valeur actuelle
        
        select.innerHTML = '';
        
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = `${category.emoji} ${category.name}`;
            select.appendChild(option);
        });
        
        // Restaurer la valeur si elle existe toujours
        if (this.categories.find(c => c.name === currentValue)) {
            select.value = currentValue;
        }
    }

    // Ajouter un nouveau défi
    addChallenge(challengeData) {
        const newId = Math.max(...this.challenges.map(c => c.id), 0) + 1;
        const newChallenge = {
            id: newId,
            text: challengeData.text,
            category: challengeData.category,
            xp: parseInt(challengeData.xp),
            active: challengeData.active
        };
        
        this.challenges.push(newChallenge);
        this.saveChallenges();
        this.updateStats();
        this.renderChallenges();
        this.showNotification('Défi ajouté avec succès !', 'success');
    }

    // Modifier un défi existant
    editChallenge(id) {
        const challenge = this.challenges.find(c => c.id === id);
        if (!challenge) return;

        this.currentEditingId = id;
        document.getElementById('challengeText').value = challenge.text;
        document.getElementById('challengeCategory').value = challenge.category;
        document.getElementById('challengeXP').value = challenge.xp;
        document.getElementById('challengeActive').checked = challenge.active;

        // Changer le texte du bouton
        const submitButton = document.querySelector('#challengeForm button[type="submit"]');
        submitButton.textContent = '💾 Modifier';
    }

    // Mettre à jour un défi
    updateChallenge(challengeData) {
        const challenge = this.challenges.find(c => c.id === this.currentEditingId);
        if (!challenge) return;

        challenge.text = challengeData.text;
        challenge.category = challengeData.category;
        challenge.xp = parseInt(challengeData.xp);
        challenge.active = challengeData.active;

        this.saveChallenges();
        this.updateStats();
        this.renderChallenges();
        this.showNotification('Défi modifié avec succès !', 'success');
        this.clearForm();
    }

    // Basculer le statut d'un défi
    toggleChallenge(id) {
        const challenge = this.challenges.find(c => c.id === id);
        if (!challenge) return;

        challenge.active = !challenge.active;
        this.saveChallenges();
        this.updateStats();
        this.renderChallenges();
        this.showNotification(`Défi ${challenge.active ? 'activé' : 'désactivé'} !`, 'success');
    }

    // Basculer entre les vues
    toggleView() {
        this.currentView = this.currentView === 'list' ? 'table' : 'list';
        
        const listView = document.getElementById('challengesListView');
        const tableView = document.getElementById('challengesTableView');
        const toggleButton = document.getElementById('toggleView');
        
        if (this.currentView === 'table') {
            listView.classList.add('hidden');
            tableView.classList.remove('hidden');
            toggleButton.textContent = '📋 Vue Liste';
            toggleButton.className = 'px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200';
        } else {
            listView.classList.remove('hidden');
            tableView.classList.add('hidden');
            toggleButton.textContent = '📊 Vue Tableau';
            toggleButton.className = 'px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200';
        }
        
        this.renderChallenges();
    }

    // Supprimer un défi
    deleteChallenge(id) {
        this.showConfirmModal(
            'Supprimer le défi',
            'Êtes-vous sûr de vouloir supprimer ce défi ? Cette action est irréversible.',
            () => {
                this.challenges = this.challenges.filter(c => c.id !== id);
                this.saveChallenges();
                this.updateStats();
                this.renderChallenges();
                this.showNotification('Défi supprimé !', 'success');
            }
        );
    }

    // Ajouter une nouvelle catégorie
    addCategory(name, emoji) {
        if (this.categories.find(c => c.name === name)) {
            this.showNotification('Cette catégorie existe déjà !', 'error');
            return;
        }

        this.categories.push({ name, emoji });
        this.saveCategories();
        this.updateStats();
        this.renderCategories();
        this.updateCategoryFilter();
        this.updateCategorySelect();
        this.updateTableFilters();
        this.showNotification('Catégorie ajoutée !', 'success');
    }

    // Supprimer une catégorie
    deleteCategory(name) {
        const challengeCount = this.challenges.filter(c => c.category === name).length;
        
        if (challengeCount > 0) {
            this.showNotification(`Impossible de supprimer : ${challengeCount} défi${challengeCount > 1 ? 's' : ''} utilisent cette catégorie`, 'error');
            return;
        }

        this.showConfirmModal(
            'Supprimer la catégorie',
            'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
            () => {
                this.categories = this.categories.filter(c => c.name !== name);
                this.saveCategories();
                this.updateStats();
                this.renderCategories();
                this.updateCategoryFilter();
                this.updateCategorySelect();
                this.updateTableFilters();
                this.showNotification('Catégorie supprimée !', 'success');
            }
        );
    }

    // Effacer le formulaire
    clearForm() {
        document.getElementById('challengeForm').reset();
        this.currentEditingId = null;
        const submitButton = document.querySelector('#challengeForm button[type="submit"]');
        submitButton.textContent = '💾 Sauvegarder';
    }

    // Exporter les données
    exportData() {
        const data = {
            challenges: this.challenges,
            categories: this.categories,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `levelup-admin-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Données exportées !', 'success');
    }

    // Importer des données
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.challenges && data.categories) {
                        this.challenges = data.challenges;
                        this.categories = data.categories;
                        this.saveChallenges();
                        this.saveCategories();
                        this.updateStats();
                        this.renderChallenges();
                        this.renderCategories();
                        this.updateCategoryFilter();
                        this.updateCategorySelect();
                        this.showNotification('Données importées avec succès !', 'success');
                    } else {
                        this.showNotification('Format de fichier invalide', 'error');
                    }
                } catch (error) {
                    this.showNotification('Erreur lors de l\'import', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    // Réinitialiser tous les utilisateurs
    resetAllUsers() {
        this.showConfirmModal(
            'Réinitialiser tous les utilisateurs',
            'Cette action supprimera toutes les données utilisateurs. Êtes-vous sûr ?',
            () => {
                const keysToRemove = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('levelup_user_data')) {
                        keysToRemove.push(key);
                    }
                }
                keysToRemove.forEach(key => localStorage.removeItem(key));
                this.updateStats();
                this.showNotification('Tous les utilisateurs ont été réinitialisés !', 'success');
            }
        );
    }

    // Exporter les données utilisateurs
    exportUsers() {
        const users = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('levelup_user_data')) {
                try {
                    const userData = JSON.parse(localStorage.getItem(key));
                    users.push({
                        userId: key,
                        data: userData
                    });
                } catch (error) {
                    console.error('Erreur lors de la lecture des données utilisateur:', key);
                }
            }
        }
        
        const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `levelup-users-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification(`${users.length} utilisateurs exportés !`, 'success');
    }

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Afficher une modale de confirmation
    showConfirmModal(title, message, onConfirm) {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;
        
        const modal = document.getElementById('confirmModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('modal-open');

        const confirmYes = document.getElementById('confirmYes');
        const confirmNo = document.getElementById('confirmNo');

        const handleConfirm = () => {
            onConfirm();
            this.closeConfirmModal();
        };

        const handleCancel = () => {
            this.closeConfirmModal();
        };

        confirmYes.onclick = handleConfirm;
        confirmNo.onclick = handleCancel;
    }

    // Fermer la modale de confirmation
    closeConfirmModal() {
        const modal = document.getElementById('confirmModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('modal-open');
    }

    // Lier les événements
    bindEvents() {
        // Formulaire de défi
        document.getElementById('challengeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                text: document.getElementById('challengeText').value.trim(),
                category: document.getElementById('challengeCategory').value,
                xp: document.getElementById('challengeXP').value,
                active: document.getElementById('challengeActive').checked
            };

            if (!formData.text) {
                this.showNotification('Le texte du défi est requis !', 'error');
                return;
            }

            if (this.currentEditingId) {
                this.updateChallenge(formData);
            } else {
                this.addChallenge(formData);
            }
        });

        // Effacer le formulaire
        document.getElementById('clearForm').addEventListener('click', () => {
            this.clearForm();
        });

        // Filtre par catégorie
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.selectedCategory = e.target.value;
            this.renderChallenges();
        });

        // Toggle actifs uniquement
        document.getElementById('toggleActive').addEventListener('click', () => {
            this.showOnlyActive = !this.showOnlyActive;
            const button = document.getElementById('toggleActive');
            if (this.showOnlyActive) {
                button.textContent = 'Tous les défis';
                button.classList.add('filter-active');
            } else {
                button.textContent = 'Actifs uniquement';
                button.classList.remove('filter-active');
            }
            this.renderChallenges();
        });

        // Toggle vue tableau/liste
        document.getElementById('toggleView').addEventListener('click', () => {
            this.toggleView();
        });

        // Filtres du tableau
        document.getElementById('tableSearch').addEventListener('input', (e) => {
            this.tableFilters.search = e.target.value;
            this.renderChallenges();
        });

        document.getElementById('tableCategoryFilter').addEventListener('change', (e) => {
            this.tableFilters.category = e.target.value;
            this.renderChallenges();
        });

        document.getElementById('tableStatusFilter').addEventListener('change', (e) => {
            this.tableFilters.status = e.target.value;
            this.renderChallenges();
        });

        document.getElementById('tableSort').addEventListener('change', (e) => {
            this.tableFilters.sortBy = e.target.value;
            this.renderChallenges();
        });

        document.getElementById('clearTableFilters').addEventListener('click', () => {
            this.clearTableFilters();
        });

        // Ajouter une catégorie
        document.getElementById('addCategory').addEventListener('click', () => {
            const name = document.getElementById('newCategory').value.trim();
            const emoji = document.getElementById('newCategoryEmoji').value.trim();
            
            if (!name) {
                this.showNotification('Le nom de la catégorie est requis !', 'error');
                return;
            }
            
            this.addCategory(name, emoji || '📋');
            document.getElementById('newCategory').value = '';
            document.getElementById('newCategoryEmoji').value = '';
        });

        // Exporter les données
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });

        // Réinitialiser tous les utilisateurs
        document.getElementById('resetAllUsers').addEventListener('click', () => {
            this.resetAllUsers();
        });

        // Exporter les utilisateurs
        document.getElementById('exportUsers').addEventListener('click', () => {
            this.exportUsers();
        });

        // Importer des données
        document.getElementById('importUsers').addEventListener('click', () => {
            this.importData();
        });

        // Fermer la modale en cliquant à l'extérieur
        document.getElementById('confirmModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('confirmModal')) {
                this.closeConfirmModal();
            }
        });

        // Fermer la modale avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeConfirmModal();
            }
        });
    }
}

// Initialiser l'administration quand le DOM est chargé
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new LevelUpAdmin();
}); 