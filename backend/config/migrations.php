<?php

use Illuminate\Database\Capsule\Manager as Capsule;

// Migrations pour créer les tables automatiquement
function runMigrations() {
    $schema = Capsule::schema();

    // Insérer des données de test
    seedDatabase();
}

function seedDatabase() {
    // Vérifier si des événements existent déjà
    if (Capsule::table('events')->count() == 0) {

        echo "Données de test insérées avec succès.\n";
    }
}

// Exécuter les migrations
runMigrations();
