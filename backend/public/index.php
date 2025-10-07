<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Middleware\ErrorMiddleware;
use App\Controllers\EventController;
use App\Middleware\CorsMiddleware;

require __DIR__ . '/../vendor/autoload.php';

// Charger les variables d'environnement
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Initialiser la base de données
require __DIR__ . '/../config/database.php';

// Créer l'application Slim
$app = AppFactory::create();

// Ajouter le middleware CORS
$app->add(new CorsMiddleware());

// Ajouter le middleware d'erreur
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Routes API
$app->group('/api', function ($group) {

    // Routes pour les événements
    $group->get('/events', [EventController::class, 'getAll']);
    $group->get('/events/{id}', [EventController::class, 'getById']);
});

// Route par défaut
$app->get('/', function (Request $request, Response $response) {
    $data = [
        'message' => 'EventApp API',
        'version' => '1.0.0',
        'endpoints' => [
            'GET /api/events' => 'Liste tous les événements',
            'GET /api/events/{id}' => 'Détails d\'un événement'
        ]
    ];

    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
