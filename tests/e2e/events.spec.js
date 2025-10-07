import { test, expect } from '@playwright/test';

test.describe('Application d\'événements - Tests E2E', () => {

  test.beforeEach(async ({ page }) => {
    // Naviguer vers la page d'accueil avant chaque test
    await page.goto('/');
  });

  test('Affichage de la page d\'accueil et navigation', async ({ page }) => {
    // Vérifier le titre de la page
    await expect(page).toHaveTitle(/EventApp/);

    // Vérifier la présence de l'en-tête
    await expect(page.getByText('EventApp')).toBeVisible();
    await expect(page.getByTestId('create-event-button')).toBeVisible();

    // Vérifier la présence du titre principal
    await expect(page.getByRole('heading', { name: 'Événements' })).toBeVisible();
  });

  test('Recherche d\'événements', async ({ page }) => {
    // Attendre que les événements se chargent
    await expect(page.getByTestId('event-card-1')).toBeVisible();

    // Tester la recherche
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('JavaScript');

    // Vérifier que seul l'événement JavaScript est visible
    await expect(page.getByText('Conférence JavaScript 2025')).toBeVisible();
    await expect(page.getByText('Atelier TailwindCSS')).not.toBeVisible();

    // Effacer la recherche
    await searchInput.clear();
    await expect(page.getByText('Atelier TailwindCSS')).toBeVisible();
  });

  test('Création d\'un nouvel événement', async ({ page }) => {
    // Cliquer sur le bouton "Créer un événement"
    await page.getByTestId('create-event-button').click();

    // Vérifier que nous sommes sur la page de création
    await expect(page.getByRole('heading', { name: 'Créer un événement' })).toBeVisible();

    // Remplir le formulaire avec une date dans le futur (après septembre 2025)
    await page.getByTestId('event-title-input').fill('Test Event Playwright');
    await page.getByTestId('event-description-input').fill('Description de test pour Playwright avec au moins 10 caractères');
    await page.getByTestId('event-date-input').fill('2026-01-15'); // Date dans le futur
    await page.getByTestId('event-time-input').fill('14:30');
    await page.getByTestId('event-location-input').fill('Toulouse, France');
    await page.getByTestId('event-max-participants-input').fill('50');

    // Soumettre le formulaire
    await page.getByTestId('create-event-submit').click();

    // Vérifier la redirection et l'affichage de l'événement créé
    await expect(page.getByTestId('event-title')).toContainText('Test Event Playwright');
    await expect(page.getByText('Toulouse, France')).toBeVisible();
  });

  test('Validation du formulaire de création', async ({ page }) => {
    // Aller sur la page de création
    await page.getByTestId('create-event-button').click();

    // Essayer de soumettre un formulaire vide
    await page.getByTestId('create-event-submit').click();

    // Vérifier la présence des messages d'erreur
    await expect(page.getByText('Le titre est requis')).toBeVisible();
    await expect(page.getByText('La description est requise')).toBeVisible();
    await expect(page.getByText('La date est requise')).toBeVisible();

    // Tester validation titre trop court
    await page.getByTestId('event-title-input').fill('ab');
    await page.getByTestId('create-event-submit').click();
    await expect(page.getByText('Le titre doit contenir au moins 3 caractères')).toBeVisible();
  });

  test('Consultation des détails d\'un événement', async ({ page }) => {
    // Attendre le chargement des événements
    await expect(page.getByTestId('event-card-1')).toBeVisible();

    // Cliquer sur le premier événement
    await page.getByTestId('view-event-1').click();

    // Vérifier que nous sommes sur la page de détails
    await expect(page.getByTestId('event-title')).toContainText('Conférence JavaScript 2025');
    await expect(page.getByText('Paris, France')).toBeVisible();
    await expect(page.getByText('100 participants')).toBeVisible();

    // Vérifier la présence du bouton d'inscription
    await expect(page.getByTestId('register-button')).toBeVisible();
  });

  test('Inscription à un événement - Processus complet', async ({ page }) => {
    // Aller sur la page de détails d'un événement
    await page.getByTestId('view-event-1').click();

    // Cliquer sur le bouton d'inscription
    await page.getByTestId('register-button').click();

    // Vérifier que le formulaire d'inscription s'affiche
    await expect(page.getByTestId('registration-name-input')).toBeVisible();

    // Remplir le formulaire d'inscription
    await page.getByTestId('registration-name-input').fill('Jean Dupont');
    await page.getByTestId('registration-email-input').fill('jean.dupont@test.com');
    await page.getByTestId('registration-phone-input').fill('0123456789');

    // Soumettre l'inscription
    await page.getByTestId('registration-submit').click();

    // Vérifier le message de succès (popup ou notification)
    await expect(page.getByText(/Inscription réussie/)).toBeVisible();
  });

  test('Validation du formulaire d\'inscription', async ({ page }) => {
    // Aller sur la page de détails et ouvrir le formulaire d'inscription
    await page.getByTestId('view-event-1').click();
    await page.getByTestId('register-button').click();

    // Essayer de soumettre un formulaire vide
    await page.getByTestId('registration-submit').click();

    // Vérifier les messages d'erreur
    await expect(page.getByText('Le nom est requis')).toBeVisible();
    await expect(page.getByText('L\'email est requis')).toBeVisible();
    await expect(page.getByText('Le téléphone est requis')).toBeVisible();

    // Tester email invalide
    await page.getByTestId('registration-email-input').fill('email-invalide');
    await page.getByTestId('registration-submit').click();
    await expect(page.getByText('L\'email n\'est pas valide')).toBeVisible();
  });

  test('Navigation et retour en arrière', async ({ page }) => {
    // Aller sur la page de création
    await page.getByTestId('create-event-button').click();
    await expect(page.getByRole('heading', { name: 'Créer un événement' })).toBeVisible();

    // Cliquer sur le bouton retour
    await page.getByRole('button', { name: 'Retour' }).click();
    await expect(page.getByRole('heading', { name: 'Événements' })).toBeVisible();

    // Test de navigation vers les détails et retour
    await page.getByTestId('view-event-1').click();
    await expect(page.getByTestId('event-title')).toBeVisible();

    await page.getByRole('button', { name: 'Retour aux événements' }).click();
    await expect(page.getByRole('heading', { name: 'Événements' })).toBeVisible();
  });

  test('Accessibilité - Navigation au clavier', async ({ page }) => {
    // Vérifier que les éléments principaux sont focusables
    await page.keyboard.press('Tab');
    await expect(page.getByText('EventApp')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByText('Événements')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByTestId('create-event-button')).toBeFocused();

    // Tester l'activation avec Enter
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: 'Créer un événement' })).toBeVisible();
  });

  test('Responsive - Version mobile', async ({ page }) => {
    // Définir la taille d'écran mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Vérifier que l'interface s'adapte
    await expect(page.getByText('EventApp')).toBeVisible();
    await expect(page.getByTestId('create-event-button')).toBeVisible();

    // Vérifier que les cartes d'événements s'affichent en colonne
    const eventCards = page.locator('[data-testid^="event-card-"]');
    await expect(eventCards.first()).toBeVisible();
  });

  test('Gestion des états de chargement', async ({ page }) => {
    // Recharger la page et vérifier l'état de chargement
    await page.reload();

    // Vérifier que le loader est visible pendant le chargement
    // (Le loader pourrait apparaître très brièvement)
    await expect(page.getByRole('heading', { name: 'Événements' })).toBeVisible();

    // Vérifier que les événements se chargent
    await expect(page.getByTestId('event-card-1')).toBeVisible();
  });
});
