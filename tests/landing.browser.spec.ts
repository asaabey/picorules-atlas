import { expect, test } from '@playwright/test';

test('landing page explains composition and opens the collection by keyboard on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 }))
    .toHaveText(/From findings to\s*composable phenotypes\./);
  await expect(page.locator('.hero-intro'))
    .toContainText('record a finding once, see the disease profiles it informs');
  await expect(page.getByRole('heading', { name: 'Start with a collection' })).toBeVisible();

  const collectionHeadingTop = await page.getByRole('heading', { name: 'Start with a collection' })
    .evaluate(element => element.getBoundingClientRect().top);
  expect(collectionHeadingTop).toBeLessThan(844);
  const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(documentWidth).toBeLessThanOrEqual(390);

  const openAssessment = page.getByRole('button', { name: 'Open assessment' });
  await openAssessment.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Inherited kidney disease' })).toBeVisible();
});
