# 🛠️ Guide d'Administration - LevelUp

Ce guide explique comment utiliser l'interface d'administration pour gérer les défis et les utilisateurs de LevelUp.

## 🚀 Accès à l'Administration

### Méthode 1 : Via l'interface principale
1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur le bouton **"🛠️ Admin"** en haut à gauche
3. Vous serez redirigé vers l'interface d'administration

### Méthode 2 : Accès direct
1. Ouvrez directement `admin.html` dans votre navigateur
2. L'interface d'administration se charge automatiquement

## 📊 Tableau de Bord

L'interface d'administration affiche en haut 4 statistiques importantes :

- **🎯 Total Défis** : Nombre total de défis créés
- **✅ Défis Actifs** : Nombre de défis actuellement disponibles
- **📊 Catégories** : Nombre de catégories de défis
- **👥 Utilisateurs** : Nombre d'utilisateurs ayant utilisé l'application

## 🎯 Gestion des Défis

### Ajouter un Nouveau Défi

1. **Remplissez le formulaire** dans la section "Ajouter/Modifier un Défi" :
   - **Texte du défi** : Description claire et motivante
   - **Catégorie** : Sélectionnez parmi les catégories existantes
   - **Points XP** : Entre 10 et 100 points (selon la difficulté)
   - **Défi actif** : Cochez pour rendre le défi disponible

2. **Cliquez sur "💾 Sauvegarder"**
3. Le défi apparaît immédiatement dans la liste

### Modifier un Défi Existant

1. **Cliquez sur "✏️"** à côté du défi à modifier
2. Le formulaire se remplit automatiquement avec les données actuelles
3. **Modifiez les champs** souhaités
4. **Cliquez sur "💾 Modifier"**

### Activer/Désactiver un Défi

- **Cliquez sur "⏸️"** pour désactiver un défi actif
- **Cliquez sur "▶️"** pour réactiver un défi inactif
- Les défis inactifs n'apparaissent plus dans l'application principale

### Supprimer un Défi

1. **Cliquez sur "🗑️"** à côté du défi
2. **Confirmez la suppression** dans la modale
3. Le défi est définitivement supprimé

### Filtrer les Défis

- **Filtre par catégorie** : Sélectionnez une catégorie spécifique
- **Actifs uniquement** : Affiche seulement les défis disponibles
- **Recherche** : Utilisez Ctrl+F pour rechercher dans la liste

## 🏷️ Gestion des Catégories

### Ajouter une Nouvelle Catégorie

1. **Remplissez les champs** :
   - **Nom de la catégorie** : Ex: "Sport", "Musique"
   - **Emoji** : Ex: "⚽", "🎵" (optionnel)

2. **Cliquez sur "➕"**
3. La catégorie apparaît dans la liste et devient disponible pour les défis

### Supprimer une Catégorie

- **Cliquez sur "🗑️"** à côté de la catégorie
- **Note** : Impossible de supprimer une catégorie utilisée par des défis
- **Solution** : Désactivez ou supprimez d'abord tous les défis de cette catégorie

## 👥 Gestion des Utilisateurs

### Actions Disponibles

1. **🔄 Réinitialiser tous les utilisateurs**
   - Supprime toutes les données utilisateurs
   - **Attention** : Action irréversible !
   - Utilisez pour nettoyer les données de test

2. **📊 Exporter les données utilisateurs**
   - Télécharge un fichier JSON avec toutes les données
   - Inclut niveau, XP, historique, défis complétés
   - Utile pour les sauvegardes ou analyses

3. **📥 Importer des données**
   - Charge un fichier JSON d'export précédent
   - Remplace toutes les données actuelles
   - **Attention** : Écrase les données existantes !

## 📤 Export/Import de Données

### Exporter les Données d'Administration

1. **Cliquez sur "📤 Exporter"** en haut à droite
2. Un fichier JSON est téléchargé contenant :
   - Tous les défis (actifs et inactifs)
   - Toutes les catégories
   - Date d'export

### Importer des Données

1. **Cliquez sur "📥 Importer des données"**
2. **Sélectionnez un fichier JSON** d'export précédent
3. Les données sont automatiquement chargées
4. L'interface se met à jour immédiatement

## 🔧 Fonctionnalités Avancées

### Synchronisation avec l'Application Principale

- Les défis actifs sont automatiquement synchronisés
- L'application principale utilise les défis de l'administration
- Aucune action manuelle requise

### Sauvegarde Automatique

- Toutes les modifications sont sauvegardées automatiquement
- Les données persistent entre les sessions
- Utilise le localStorage du navigateur

### Notifications

- **Succès** : Actions réussies (vert)
- **Erreur** : Problèmes détectés (rouge)
- **Info** : Informations générales (bleu)

## 🎨 Personnalisation

### Ajouter de Nouvelles Catégories

Exemples de catégories populaires :
- **🎭 Art** : Défis créatifs et artistiques
- **🏃 Sport** : Défis physiques et sportifs
- **🍳 Cuisine** : Défis culinaires
- **🌱 Nature** : Défis en extérieur
- **📖 Lecture** : Défis de lecture et apprentissage

### Conseils pour Créer des Défis

1. **Clarté** : Descriptions précises et compréhensibles
2. **Motivation** : Défis stimulants mais réalisables
3. **Variété** : Mélangez difficultés et types d'activités
4. **XP équilibré** : Points proportionnels à la difficulté
5. **Catégorisation** : Utilisez des catégories pertinentes

## 🔒 Sécurité et Bonnes Pratiques

### Sauvegarde Régulière

- **Exportez régulièrement** vos données
- **Conservez** les fichiers d'export en lieu sûr
- **Testez** les imports sur un environnement de test

### Gestion des Utilisateurs

- **Réinitialisez** les données de test régulièrement
- **Exportez** avant les modifications importantes
- **Documentez** les changements majeurs

### Maintenance

- **Vérifiez** régulièrement les défis inactifs
- **Nettoyez** les catégories inutilisées
- **Testez** l'application après modifications

## 🚨 Dépannage

### Problèmes Courants

**Les défis ne s'affichent pas dans l'application principale**
- Vérifiez que les défis sont marqués comme "actifs"
- Rechargez la page principale

**Erreur lors de l'import**
- Vérifiez le format du fichier JSON
- Assurez-vous que le fichier contient les bonnes données

**Données perdues**
- Vérifiez le localStorage du navigateur
- Restaurez depuis un export précédent

### Support

Pour toute question ou problème :
1. Vérifiez ce guide
2. Testez sur un autre navigateur
3. Exportez vos données avant toute modification importante

---

**Bonne administration ! 🚀✨** 