<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Models\Event;
use App\Models\Participant;

class EventController
{
    // Récupérer tous les événements
    public function getAll(Request $request, Response $response): Response
    {
        try {

            $response->getBody()->write(json_encode(['à développer']));
            return $response->withHeader('Content-Type', 'application/json');

        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Erreur lors du chargement des événements', 500);
        }
    }

    // Récupérer un événement par ID
    public function getById(Request $request, Response $response, array $args): Response
    {
        try {
           $response->getBody()->write(json_encode(['à développer']));
            return $response->withHeader('Content-Type', 'application/json');

        } catch (\Exception $e) {
            return $this->errorResponse($response, 'Erreur lors du chargement de l\'événement', 500);
        }
    }

    // Réponse d'erreur standardisée
    private function errorResponse(Response $response, string $message, int $statusCode = 400, array $errors = [])
    {
        $data = [
            'success' => false,
            'message' => $message
        ];

        if (!empty($errors)) {
            $data['errors'] = $errors;
        }

        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json')->withStatus($statusCode);
    }
}
