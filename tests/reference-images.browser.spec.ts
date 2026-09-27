import { expect, test } from '@playwright/test';

test('reference images open by keyboard with local bytes, caption, and license on mobile', async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  for (const name of ['Angiokeratomas', 'Cornea verticillata', 'Hypomelanotic macules',
    'Shagreen patch', 'Renal angiomyolipoma', 'Angiofibromas']) {
    const card = page.locator('article.question-card').filter({
      has: page.getByRole('heading', { name, exact: true }),
    });
    const summary = card.locator('details.reference-image summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    const picture = card.locator('details.reference-image img');
    await expect(picture).toBeVisible();
    await expect.poll(() => picture.evaluate(image => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    const src = await picture.getAttribute('src');
    expect(src).toMatch(/^\/reference-images\/[a-z0-9-]+\.(jpg|png)$/);
    const response = await request.get(new URL(src!, page.url()).toString());
    expect(response.ok()).toBe(true);
    const fs = await import('node:fs/promises');
    expect(await response.body()).toEqual(await fs.readFile(`public${src}`));
    await expect(card.locator('details.reference-image figcaption')).toContainText('Reference example only');
    await expect(card.getByRole('link', { name: 'Source', exact: true })).toHaveAttribute('href', /^https:\/\//);
    await expect(card.getByRole('link', { name: /^CC BY/ })).toHaveAttribute('href', /^https:\/\//);
    await page.keyboard.press('Enter');
    await expect(picture).toBeHidden();
  }
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
