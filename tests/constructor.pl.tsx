import { test, expect } from '@playwright/test';

test.describe('Проверка добавления ингредиентов в конструктор', function () {
  test.beforeEach('Подключение HAR-файла и открытие страницы', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      notFound: 'abort',
    });
    await page.goto('/');
  });
  test('Добавление булки в конструктор', async ({ page }) => {
    const bunCard = page.locator('li').filter({
      hasText: 'Краторная булка N-200i',
    });
    const constructorArea = page.getByTestId('burger-constructor');
    await expect(
      constructorArea.getByText('Краторная булка N-200i (верх)')
    ).not.toBeVisible();
    await bunCard.getByRole('button', { name: /Добавить/i }).click();
    await expect(
      constructorArea.getByText('Краторная булка N-200i (верх)')
    ).toBeVisible();
    await expect(
      constructorArea.getByText('Краторная булка N-200i (низ)')
    ).toBeVisible();
  });
  test('Добавление начинки в конструктор', async ({ page }) => {
    const pattyCard = page.locator('li').filter({
      hasText: 'Биокотлета из марсианской Магнолии',
    });
    const constructorArea = page.getByTestId('burger-constructor');
    await expect(
      constructorArea.getByText('Биокотлета из марсианской Магнолии')
    ).not.toBeVisible();
    await pattyCard.getByRole('button', { name: /Добавить/i }).click();
    await expect(
      constructorArea.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
  });
});
test.describe('Проверка модального окна', function () {
  test.beforeEach('Подключение HAR-файла и открытие страницы', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      notFound: 'abort',
    });
    await page.goto('/');
  });
  test('Открытие модального окна', async ({ page }) => {
    const modal = page.getByTestId('modal');
    await expect(modal).not.toBeVisible();
    await page
      .getByRole('link', { name: 'Мясо бессмертных моллюсков Protostomia' })
      .click();
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Закрыть' })).toBeVisible();
    await expect(
      modal.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();
    await expect(
      modal.getByRole('heading', { name: 'Мясо бессмертных моллюсков Protostomia' })
    ).toBeVisible();
    await expect(modal.getByText('Калории, ккал')).toBeVisible();
    await expect(modal.getByText('420', { exact: true })).toBeVisible();
    await expect(modal.getByText('Белки, г')).toBeVisible();
    await expect(modal.getByText('433', { exact: true })).toBeVisible();
  });
  test('Закрытие модального окна по крестику', async ({ page }) => {
    const modal = page.getByTestId('modal');
    await page.getByRole('link', { name: 'Краторная булка N-200i' }).click();
    await expect(modal).toBeVisible();
    await modal.getByRole('button', { name: 'Закрыть' }).click();
    await expect(modal).not.toBeVisible();
  });
  test('Закрытие модального окна по оверлею', async ({ page }) => {
    const modal = page.getByTestId('modal');
    await page.getByRole('link', { name: 'Краторная булка N-200i' }).click();
    await expect(modal).toBeVisible();
    const overlay = page.getByTestId('modal-overlay');
    await overlay.click({ position: { x: 10, y: 10 } });
    await expect(modal).not.toBeVisible();
  });
});

test.describe('Проверка оформления заказа', function () {
  test.beforeEach('Подготовка авторизации и HAR', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        url: 'http://localhost:4000/',
      },
    ]);
    await page.addInitScript(function () {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/api/auth/user',
      notFound: 'abort',
    });
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      notFound: 'abort',
    });
    await page.routeFromHAR('tests/hars/orders.har', {
      url: '**/api/orders',
      notFound: 'abort',
    });
    await page.goto('/');
  });
  test('Проверка оформления заказа', async ({ page }) => {
    const bunCard = page.locator('li').filter({
      hasText: 'Краторная булка N-200i',
    });
    const constructorArea = page.getByTestId('burger-constructor');
    const modal = page.getByTestId('modal');
    await bunCard.getByRole('button', { name: /Добавить/i }).click();
    const pattyCard = page.locator('li').filter({
      hasText: 'Биокотлета из марсианской Магнолии',
    });
    await pattyCard.getByRole('button', { name: /Добавить/i }).click();
    await expect(
      constructorArea.getByText('Краторная булка N-200i (верх)')
    ).toBeVisible();
    await expect(
      constructorArea.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
    await expect(
      constructorArea.getByText('Краторная булка N-200i (низ)')
    ).toBeVisible();
    await expect(modal).not.toBeVisible();
    await page.getByRole('button', { name: 'Оформить заказ' }).click();
    await expect(modal).toBeVisible();
    await expect(modal.getByText('12345')).toBeVisible();
    await expect(
      constructorArea.getByText('Краторная булка N-200i (верх)')
    ).not.toBeVisible();
    await expect(
      constructorArea.getByText('Биокотлета из марсианской Магнолии')
    ).not.toBeVisible();
    await expect(
      constructorArea.getByText('Краторная булка N-200i (низ)')
    ).not.toBeVisible();
    await modal.getByRole('button', { name: 'Закрыть' }).click();
    await expect(modal).not.toBeVisible();
  });
});
