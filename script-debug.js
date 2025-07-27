// Version de debug pour diagnostiquer les problèmes
console.log('Script de debug chargé');

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé - début de l\'initialisation');
    
    // Test simple des éléments
    const elements = [
        'completeChallenge',
        'changeChallenge',
        'viewLevels',
        'shareProgress',
        'monthlyAssessment',
        'addWeeklyObjective'
    ];
    
    console.log('Vérification des éléments :');
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`✅ ${id} trouvé`);
        } else {
            console.error(`❌ ${id} NON TROUVÉ`);
        }
    });
    
    // Test simple d'un bouton
    const completeButton = document.getElementById('completeChallenge');
    if (completeButton) {
        console.log('Ajout d\'event listener sur completeChallenge');
        completeButton.addEventListener('click', () => {
            console.log('Bouton "Je l\'ai fait !" cliqué');
            alert('Bouton fonctionne !');
        });
    } else {
        console.error('Bouton completeChallenge non trouvé');
    }
    
    // Test de l'évaluation mensuelle
    const assessmentButton = document.getElementById('monthlyAssessment');
    if (assessmentButton) {
        console.log('Ajout d\'event listener sur monthlyAssessment');
        assessmentButton.addEventListener('click', () => {
            console.log('Bouton évaluation mensuelle cliqué');
            alert('Évaluation mensuelle fonctionne !');
        });
    } else {
        console.error('Bouton monthlyAssessment non trouvé');
    }
    
    // Test des objectifs hebdomadaires
    const addObjectiveButton = document.getElementById('addWeeklyObjective');
    if (addObjectiveButton) {
        console.log('Ajout d\'event listener sur addWeeklyObjective');
        addObjectiveButton.addEventListener('click', () => {
            console.log('Bouton ajouter objectif cliqué');
            alert('Ajouter objectif fonctionne !');
        });
    } else {
        console.error('Bouton addWeeklyObjective non trouvé');
    }
    
    console.log('Initialisation de debug terminée');
}); 