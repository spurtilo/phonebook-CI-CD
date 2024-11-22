const { test, describe, expect, beforeEach } = require('@playwright/test');

const createPerson = async (page, name, number) => {
  await page.getByLabel('Name:').fill(name);
  await page.getByLabel('Number:').fill(number);
  await page.locator('button:has-text("Add")').click();
};

describe('Phonebook-cicd', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await createPerson(page, 'Teppo Testinen', '040-1112222');
  });

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Phonebook')).toBeVisible();
    await expect(page.getByText('Filter shown with:')).toBeVisible();
    await expect(page.locator('button:has-text("Add")')).toBeVisible();
    await expect(page.getByText('Numbers')).toBeVisible();
  });

  test('a new person can be added and a success notification is shown', async ({
    page,
  }) => {
    await expect(page.getByText('Teppo Testinen 040-1112222')).toBeVisible();
    await expect(page.getByText('Added Teppo Testinen')).toBeVisible();
  });

  test('if the added person exists, number can be updated and a success notification is shown', async ({
    page,
  }) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await expect(page.getByText('Teppo Testinen 040-1112222')).toBeVisible();

    await createPerson(page, 'Teppo Testinen', '050-2221111');

    await expect(page.getByText('050-2221111')).toBeVisible();
    await expect(page.getByText('Updated Teppo Testinen')).toBeVisible();
  });

  test('phonebook can be filtered by name', async ({ page }) => {
    await expect(page.getByText('Teppo Testinen 040-1112222')).toBeVisible();
    await createPerson(page, 'Tuomas Testinen', '040-5557777');
    await expect(page.getByText('Tuomas Testinen 040-5557777')).toBeVisible();

    await page.getByLabel('Filter shown with: ').pressSequentially('Teppo');

    await expect(page.getByText('Teppo Testinen 040-1112222')).toBeVisible();
    await expect(
      page.getByText('Tuomas Testinen 040-5557777')
    ).not.toBeVisible();
  });

  test('a person can be deleted and a success notification is shown', async ({
    page,
  }) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await expect(page.getByText('Teppo Testinen 040-1112222')).toBeVisible();

    await page.locator('button:has-text("Delete")').click();

    await expect(
      page.getByText('Teppo Testinen 040-1112222')
    ).not.toBeVisible();
    await expect(page.getByText('Deleted Teppo Testinen')).toBeVisible();
  });
});
