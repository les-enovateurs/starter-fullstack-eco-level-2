<?php

use Illuminate\Database\Capsule\Manager as Capsule;

// Configuration de la base de données avec Eloquent
$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => $_ENV['DB_DRIVER'] ?? 'sqlite',
    'host'      => $_ENV['DB_HOST'] ?? 'localhost',
    'database'  => $_ENV['DB_DATABASE'] ?? __DIR__ . '/../database/events.sqlite',
    'username'  => $_ENV['DB_USERNAME'] ?? '',
    'password'  => $_ENV['DB_PASSWORD'] ?? '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

// Rendre Eloquent disponible globalement
$capsule->setAsGlobal();

// Démarrer Eloquent
$capsule->bootEloquent();

// Créer la base SQLite si elle n'existe pas
$dbPath = __DIR__ . '/../database/events.sqlite';
if (!file_exists($dbPath)) {
    touch($dbPath);

    // Créer les tables automatiquement
    require_once __DIR__ . '/migrations.php';
}

