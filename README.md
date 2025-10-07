# Projet Événements

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Pour lancer le projet avec Docker composer
### Lancement
docker compose up --build -d
### Accès
- Front / http://localhost:5173/
- Back API (accessible navigateur pour test) / http://localhost:8000/

## 🧪 Tests

### GitHub Actions - CI/CD
Le projet utilise GitHub Actions pour l'intégration continue :

- **Tests E2E** : Exécutés automatiquement avec Playwright sur chaque push
- **Tests Backend** : Tests PHP/Pest exécutés en parallèle  
- **Vérifications qualité** : ESLint, formatage du code
- **Sécurité** : Scan de vulnérabilités avec Trivy

#### Badges de statut
Les workflows s'exécutent automatiquement sur :
- Push sur les branches `main` et `develop`
- Ouverture/mise à jour de Pull Requests

#### Artefacts générés
- Rapports de tests Playwright (30 jours)
- Screenshots en cas d'échec (30 jours)
- Résultats des tests backend (30 jours)

### Tests E2E avec Playwright
Le projet dispose d'un service Docker dédié aux tests E2E utilisant Playwright.

#### Lancer tous les tests E2E
```bash
docker compose --profile test up tests
```

#### Lancer tous les services (frontend, backend + tests)
```bash
docker compose --profile test up
```

#### Voir les rapports de tests
```bash
cd tests && npm run test:report
```

### Tests Backend PHP (Pest)
#### Lancer les tests PHP dans le conteneur backend
```bash
docker compose exec backend composer test
```

#### Ou si le backend n'est pas en cours d'exécution
```bash
docker compose run --rm backend composer test
```

### Tests en local (sans Docker)
Si vous préférez exécuter les tests localement :

#### Tests E2E
```bash
cd tests
npm install
npx playwright install
npm run test
```

#### Tests Backend
```bash
cd backend
composer install
composer test
```

## 🚀 Technologies

- **Frontend** : React 18, TailwindCSS, Vite
- **Backend** : PHP 8, Slim Framework 4, Eloquent ORM
- **Base de données** : SQLite (développement), MySQL (production)
- **Tests** : Playwright, PHPUnit
- **Outils** : Git, GitHub Projects

## 📂 Structure du projet

```
starter-fullstack-eco-level-2
├── frontend/          # Application React
├── backend/           # API PHP Slim
├── tests/            # Tests Playwright
├── docs/             # Documentation
└── docker-compose.yml # Environnement de développement
```

## 🎨 Maquette Figma

[Lien vers la maquette Figma à créer]

## 🌱 Éco-conception

- Optimisation des images
- Lazy loading
- Code splitting
- Performance web

## 🚀 Pour commencer

1. Forker ce repository https://github.com/les-enovateurs/starter-fullstack-eco-level-2
2. Cloner ton fork
3. Suivre le guide d'installation
4. Créer une branche pour les développements

Bonne chance ! 🍀
