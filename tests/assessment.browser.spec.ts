import { expect, test } from '@playwright/test';

test('collection selection, answers, context, reset and leaving', async ({ page }, testInfo) => {
  const answerWrites: string[] = [];
  page.on('request', request => {
    if (request.method() !== 'GET' && request.method() !== 'HEAD') {
      answerWrites.push(`${request.method()} ${request.url()}`);
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Choose an assessment' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open assessment' })).toHaveCount(1);
  await page.screenshot({ path: testInfo.outputPath('selector.png'), fullPage: true });

  await page.getByRole('button', { name: 'Open assessment' }).click();
  await expect(page.getByRole('heading', { name: 'Inherited kidney disease' })).toBeVisible();
  await expect(page.locator('article.question-card')).toHaveCount(10);
  for (const section of ['Kidney', 'Skin and sweating', 'Eyes', 'Neurological history']) {
    await expect(page.getByRole('heading', { name: section, exact: true })).toBeVisible();
  }
  await expect(page.getByText('0 / 10 answered')).toBeVisible();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('assessment.png'), fullPage: true });

  const proteinuria = page.locator('article.question-card').filter({
    has: page.getByRole('heading', { name: 'Proteinuria' }),
  });
  await proteinuria.getByRole('radio', { name: 'Present' }).check();
  await expect(page.getByText('1 / 10 answered')).toBeVisible();
  await proteinuria.getByRole('radio', { name: 'Absent' }).check();
  await expect(proteinuria.getByRole('radio', { name: 'Absent' })).toBeChecked();
  await proteinuria.getByRole('radio', { name: 'Unknown / not assessed' }).check();
  await expect(proteinuria.getByRole('radio', { name: 'Unknown / not assessed' })).toBeChecked();
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
  }))).toEqual({ local: [], session: [] });

  await proteinuria.locator('summary').filter({ hasText: 'Fabry disease' }).click();
  await expect(proteinuria.getByText('This is background context')).toBeVisible();
  await expect(proteinuria.getByRole('link', { name: /GeneReviews/i })).toHaveAttribute('href', /^https:\/\//);
  await page.screenshot({ path: testInfo.outputPath('disease-context.png'), fullPage: true });
  await proteinuria.locator('summary').filter({ hasText: 'Fabry disease' }).focus();
  await page.keyboard.press('Enter');
  await expect(proteinuria.getByText('This is background context')).toBeHidden();
  await page.keyboard.press('Enter');
  await expect(proteinuria.getByText('This is background context')).toBeVisible();

  await page.getByRole('button', { name: 'Reset answers' }).click();
  await expect(page.getByText('0 / 10 answered')).toBeVisible();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);

  await proteinuria.getByRole('radio', { name: 'Absent' }).check();
  await page.getByRole('button', { name: 'All collections' }).click();
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.getByRole('button', { name: 'Keep assessing' }).click();
  await expect(page.getByRole('heading', { name: 'Inherited kidney disease' })).toBeVisible();
  await page.getByRole('button', { name: 'All collections' }).click();
  await page.getByRole('button', { name: 'Discard answers' }).click();
  await expect(page.getByRole('heading', { name: 'Choose an assessment' })).toBeVisible();
  await page.getByRole('button', { name: 'Open assessment' }).click();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);
  await proteinuria.getByRole('radio', { name: 'Present' }).check();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Choose an assessment' })).toBeVisible();
  expect(answerWrites).toEqual([]);
});

test('mobile assessment has usable controls without horizontal overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open assessment' })).toBeVisible();
  await page.getByRole('button', { name: 'Open assessment' }).click();

  const proteinuria = page.locator('article.question-card').filter({
    has: page.getByRole('heading', { name: 'Proteinuria' }),
  });
  await proteinuria.getByRole('radio', { name: 'Present' }).check();
  await proteinuria.locator('summary').filter({ hasText: 'Fabry disease' }).click();
  await expect(proteinuria.getByRole('link', { name: /GeneReviews/i })).toBeVisible();
  await expect(page.getByText('1 / 10 answered')).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
  }))).toEqual({ local: [], session: [] });
  await page.screenshot({ path: testInfo.outputPath('assessment-mobile.png'), fullPage: true });

  await page.getByRole('button', { name: 'Reset answers' }).click();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);
});

test('assessment opens when randomUUID is unavailable on an HTTP LAN origin', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Crypto.prototype, 'randomUUID', { value: undefined, configurable: true });
  });
  await page.goto('/');
  expect(await page.evaluate(() => typeof crypto.randomUUID)).toBe('undefined');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  await expect(page.locator('article.question-card')).toHaveCount(10);
  await expect(page.getByText('This assessment could not be opened. Please try again later.')).toHaveCount(0);
  await page.locator('article.question-card').first().getByRole('radio', { name: 'Present' }).check();
  await expect(page.getByText('1 / 10 answered')).toBeVisible();
});
