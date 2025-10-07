# Guide d'Installation et d'Utilisation

## 📋 Prérequis

- Node.js 18+ et npm
- PHP 8.0+
- Composer
- Git

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone [votre-repo]
cd starter-fullstack-eco-level-2
```

### 2. Installation du Frontend
```bash
cd frontend
npm install
```

### 3. Installation du Backend
```bash
cd ../backend
composer install
```

### 4. Configuration de l'environnement
```bash
cp .env.example .env
# Modifier les variables si nécessaire
```

### 5. Installation des tests
```bash
cd ../tests
npm install
npx playwright install
```

## 🔧 Développement

### Démarrer le Backend (Terminal 1)
```bash
cd backend
composer start
# API disponible sur http://localhost:8000
```

### Démarrer le Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# Interface disponible sur http://localhost:5173
```

### Lancer les tests (Terminal 3)
```bash
cd tests
npm test
```

## 🏗️ Architecture du Projet

### Frontend (React + TailwindCSS)
- **React 18** avec hooks modernes
- **TailwindCSS** pour le styling
- **React Router** pour la navigation
- **Axios** pour les appels API
- **Context API** pour l'état global

### Backend (PHP Slim + Eloquent)
- **Slim Framework 4** pour l'API REST
- **Eloquent ORM** pour la base de données
- **SQLite** en développement
- **CORS** configuré pour le frontend

### Tests (Playwright)
- Tests E2E automatisés
- Multi-navigateurs (Chrome, Firefox, Safari)
- Tests d'accessibilité
- Tests responsive

## 📝 API Endpoints

### Événements
- `GET /api/events` - Liste tous les événements
- `GET /api/events/{id}` - Détails d'un événement

## ✅ Tests

### Lancer tous les tests
```bash
cd tests
npx playwright test
```

### Lancer les tests en mode interactif
```bash
npx playwright test --ui
```

### Voir le rapport de tests
```bash
npx playwright show-report
```

## 🌍 Accessibilité

L'application respecte les standards WCAG 2.1 :
- Navigation au clavier complète
- Contrastes de couleurs optimisés
- Attributs ARIA appropriés
- Labels et descriptions accessibles
- Focus visible sur tous les éléments interactifs

## 🚀 Déploiement

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Déployer le dossier dist/
```

### Backend (Serveur PHP)
```bash
cd backend
# Configurer .env pour la production
# Pointer le serveur web vers public/
```

## 🔧 Développement Avancé

### Ajouter une nouvelle fonctionnalité
1. Créer une nouvelle branche : `git checkout -b feature/ma-fonctionnalite`
2. Développer frontend + backend
3. Ajouter les tests Playwright
4. Créer une Pull Request

### Structure des fichiers
```
starter-fullstack-eco-level-2/
├── frontend/              # Application React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── context/       # Context API
│   │   ├── hooks/         # Hooks personnalisés
│   │   └── utils/         # Utilitaires
├── backend/               # API PHP
│   ├── src/
│   │   ├── Models/        # Modèles Eloquent
│   │   ├── Controllers/   # Contrôleurs API
│   │   └── Middleware/    # Middlewares
├── tests/                 # Tests Playwright
└── docs/                  # Documentation
```

## 📚 Ressources d'apprentissage

### Frontend
- [React Documentation](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

### Backend
- [Slim Framework](https://www.slimframework.com/)
- [Eloquent ORM](https://laravel.com/docs/eloquent)

### Tests
- [Playwright Documentation](https://playwright.dev/)
